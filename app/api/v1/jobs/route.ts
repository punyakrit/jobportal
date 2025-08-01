import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const body = await request.json();
        const userId = body.userId;
        
        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        if (!process.env.APIFY_TOKEN) {
            console.error('APIFY_TOKEN environment variable is not set');
            return NextResponse.json({ error: 'Service configuration error' }, { status: 500 });
        }

        const { data, error } = await supabase.schema('public').from('plans').select('*').eq('user_id', userId);
        if (error) {
            console.error('Database error:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'User plan not found' }, { status: 404 });
        }

        if (body.jobs_entries > data[0].credits) {
            return NextResponse.json({ error: 'Insufficient credits' }, { status: 403 });
        }

        const credits = data[0].credits;
        if (credits <= 0) {
            return NextResponse.json({ error: 'No credits available' }, { status: 403 });
        }

        const apifyPayload = {
            experience_level: body.experience_level || undefined,
            job_post_time: body.job_post_time || undefined,
            job_title: body.job_title || undefined,
            job_type: body.job_type || undefined,
            jobs_entries: body.jobs_entries || 10,
            location: body.location || undefined,
            work_schedule: body.work_schedule || undefined,
        };

        console.log('Calling Apify API with payload:', apifyPayload);

        const response = await axios.post(`https://api.apify.com/v2/acts/worldunboxer~rapid-linkedin-scraper/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`, apifyPayload);

        if (!response.data || response.data.length === 0) {
            return NextResponse.json({ error: 'No jobs found for the given criteria' }, { status: 404 });
        }

        const insertPromises = response.data.map(async (job: any) => {
            const { data: jobs, error: jobsError } = await supabase.schema('public').from('jobs').insert({
                user_id: userId,
                company_data: job,
                viewed: false,
                applied: false,
                created_at: new Date().toISOString()
            });
            if (jobsError) {
                console.error('Job insert error:', jobsError);
                throw new Error('Failed to insert job');
            }
            return jobs;
        });

        try {
            await Promise.all(insertPromises);
        } catch (error) {
            console.error('Batch insert error:', error);
            return NextResponse.json({ error: 'Failed to save jobs' }, { status: 500 });
        }

        const { error: jobsError } = await supabase.schema('public').from('plans').update({
            credits: credits - response.data.length
        }).eq('user_id', userId);

        await supabase.schema('public').from('credit_history').insert({
            user_id: userId,
            change: -response.data.length,
            reason: 'Jobs Search',
            created_at: new Date().toISOString(),
        })

        if (jobsError) {
            console.error('Credit update error:', jobsError);
            return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 });
        }

        return NextResponse.json({
            data: response.data,
            length: response.data.length,
        });
    } catch (error: any) {
        console.error('Jobs API error:', error);
        
        if (error.response) {
            console.error('External API error:', error.response.data);
            return NextResponse.json({ 
                error: 'External service error', 
                details: error.response.data 
            }, { status: error.response.status });
        }
        
        return NextResponse.json({ 
            error: 'Internal server error',
            details: error.message 
        }, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const userId = searchParams.get('user_id');
    const supabase = await createClient();

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase.rpc('get_jobs_paginated', {
        page_number: page || 1,
        page_size: limit || 10,
        filter_user_id: userId
    });

    if (error) {
        console.error('RPC Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const totalCount = data?.total_count || 0;
    const jobs = data?.data || [];
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({ 
        data: jobs,
        pagination: {
            current_page: page,
            total_pages: totalPages,
            total_count: totalCount,
            page_size: limit,
            has_next: page < totalPages,
            has_previous: page > 1
        }
    });
}