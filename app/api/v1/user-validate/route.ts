import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const body = await req.json()
    const supabase = await  createClient()
    const {data, error} = await supabase.schema('public').from('plans').select('user_id').eq('user_id', body.id)
    if(error){
        return NextResponse.json({error: error.message}, {status: 500})
    }
    if(data.length === 0){
        await supabase.schema('public').from('plans').insert({
            user_id: body.id,
            plan: 'FREE',
            credits: 50,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        })

        await supabase.schema('public').from('credit_history').insert({
            user_id: body.id,
            change: +50,
            reason: 'Initial credits',
            created_at: new Date().toISOString(),
        })
        return NextResponse.json({message: "User created"})
    }
    return NextResponse.json({message: "User already exists"})
}