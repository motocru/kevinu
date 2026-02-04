import { InsertQuery, SelectQuery } from "@/server/db";
import { TimerCreateGame, TimerGame, TimerRound, TimerFullGame, QuakeGame, gameRecord } from "@/server/timer/objects";
import { NextResponse } from "next/server";

//GET all of the timer game results for the user
export async function GET(request: Request, { params }: { params: Promise<{ user: string }> }) {
    const { user } = await params;

    return new Response(`Hello ${user}`);
}

//POST a new timer game for the user
export async function POST(request: Request, { params }: { params: Promise<{ user: string }> }) {
    const { user } = await params;
    const body: TimerCreateGame = await request.json();
    const gameID = crypto.randomUUID();
    const game: TimerGame = {
        id: gameID,
        user: user,
        rounds: body.rounds,
        currentRound: 1,
        items: body.items,
        game: body.game === QuakeGame.QuakeLive ? "Quake Live" : "Quake Champions"
    };
    const result = await InsertQuery("INSERT INTO timer SET ?", game);

    //insert one record per rounds for the game
    for (let i = 1; i <= body.rounds; i++) {

        const item = body.items[Math.floor(Math.random() * body.items.length)];
        const startTime = Math.floor(Math.random() * (60 - 0) * 0);
        var spawnTime = body.game === QuakeGame.QuakeLive ? item === "Mega" ? 35 : 25 : 30;
        if (spawnTime >= 60) {
            spawnTime %= 60;
        }
        const round: TimerRound = {
            id: crypto.randomUUID(),
            gameId: gameID,
            round: i,
            startTime: startTime,
            spawnTime: spawnTime,
            item: item,
            status: "In Progress"
        };
        await InsertQuery("INSERT INTO timer_round SET ?", round);
    }
    if (result.warningStatus === 0) {
        const storedGame = await SelectQuery("SELECT * FROM timer WHERE id = ?", [gameID]);
        return NextResponse.json(storedGame[0], { status: 200 });
    }
    else {
        return NextResponse.json({ error: "Failed to create game" }, { status: 500 });
    }
}