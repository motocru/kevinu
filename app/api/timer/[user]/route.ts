import { DeleteQuery, InsertQuery, SelectQuery } from "@/server/db";
import { TimerCreateGame, TimerGame, TimerRound, TimerFullGame, QuakeGame, gameRecord } from "@/lib/objects";
import { NextResponse } from "next/server";

//POST a new timer game for the user
export async function POST(request: Request, { params }: { params: Promise<{ user: string }> }) {
    const { user } = await params;
    const body: TimerCreateGame = await request.json();
    const game: TimerGame = {
        user: user,
        rounds: body.rounds,
        currentRound: 1,
        items: body.items.join(","),
        game: body.game === QuakeGame.QuakeLive ? "Quake Live" : "Quake Champions"
    };
    const result = await InsertQuery("INSERT INTO timer SET ?", game);

    //insert one record per rounds for the game
    for (let i = 1; i <= body.rounds; i++) {
        const item = body.items[Math.floor(Math.random() * body.items.length)];
        const startTime = Math.floor(Math.random() * 60);
        var spawnTime = body.game === QuakeGame.QuakeLive ? item === "Mega" ? 35 : 25 : 30;
        spawnTime += startTime;
        if (spawnTime >= 60) {
            spawnTime %= 60;
        }
        const round: TimerRound = {
            id: user,
            round: i,
            startTime: startTime,
            spawnTime: spawnTime,
            item: item,
            status: "In Progress",
            game: game.game
        };
        const roundResult = await InsertQuery("INSERT INTO timer_round SET ?", round);
        if (roundResult.warningStatus !== 0) {
            return NextResponse.json({ error: "Failed to create round" }, { status: 500 });
        }
    }
    if (result.warningStatus === 0) {
        const fullTimerGame = await getFullTimerGame(user);
        return NextResponse.json(fullTimerGame, { status: 200 });
    }
    else {
        return NextResponse.json({ error: "Failed to create game" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ user: string }> }) {
    const { user } = await params;
    const gameDeleteResult = await DeleteQuery("DELETE FROM timer WHERE user = ?", [user]);
    const roundDeleteResult = await DeleteQuery("DELETE FROM timer_round WHERE id = ?", [user]);
    if (gameDeleteResult.warningStatus === 0 && roundDeleteResult.warningStatus === 0) {
        return NextResponse.json({ message: "Game deleted successfully" }, { status: 200 });
    }
    else {
        console.log(gameDeleteResult);
        console.log(roundDeleteResult);
        return NextResponse.json({ error: "Failed to delete game" }, { status: 500 });
    }
}

export async function getFullTimerGame(gameId: string) {
    const storedGame = await SelectQuery<TimerGame>("SELECT * FROM timer WHERE user = ?", [gameId]);
    const timerRoundStatement = 'SELECT id, item, startTime, round, guess, status, game, CASE WHEN status <> "In Progress" THEN spawnTime ELSE NULL END AS spawnTime FROM timer_round WHERE id = ? AND round <= ?';
    const rounds = await SelectQuery<TimerRound>(timerRoundStatement, [gameId, storedGame[0].currentRound]);
    const returnGame: TimerFullGame = {
        game: storedGame[0],
        rounds: rounds
    };
    return returnGame;
}