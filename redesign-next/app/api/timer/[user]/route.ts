//GET all of the timer game results for the user
export async function GET(request: Request, { params }: { params: Promise<{ user: string }> }) {
    const { user } = await params;
    return new Response(`Hello ${user}`);
}

//POST a new timer game for the user
export async function POST(request: Request, { params }: { params: Promise<{ user: string }> }) {
    const { user } = await params;
    return new Response(`Hello ${user}`);
}