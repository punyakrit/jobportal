import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const supabase = await createClient()
    const query = req.nextUrl.searchParams
    const { data, error } = await supabase.schema('public').from('plans').select('*').eq('user_id', query.get('user_id'))
    if (error) {
        return NextResponse.json({ plan: 'UNKNOWN', credits: 0 }, { status: 200 })
    }
    if(data.length === 0){
        return NextResponse.json({ plan: 'UNKNOWN', credits: 0 }, { status: 200 })
    }
    return NextResponse.json({
        plan: data[0].plan,
        credits: data[0].credits,
    }, { status: 200 })
}