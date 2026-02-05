import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ user: string, round: string }> }) {
    const { user, round } = await params;
    const { time } = await request.json() as { time: number };
    if (!time || time > 59 || time < 0) {
        return NextResponse.json({ error: "Time is required and must be between 0 and 59" }, { status: 400 });
    }
    return new Response(`Hello ${user} ${round}`);
}