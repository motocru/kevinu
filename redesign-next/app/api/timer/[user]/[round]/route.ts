import { SelectQuery, UpdateQuery } from "@/server/db";
import { TimerGame, TimerRound } from "@/server/timer/objects";
import { NextResponse } from "next/server";
import { getFullTimerGame } from "../route";

export async function PUT(request: Request, { params }: { params: Promise<{ user: string, round: number }> }) {
    const { user, round } = await params;
    const { time } = await request.json() as { time: number };

    if (time > 59 || time < 0) {
        return NextResponse.json({ error: "Time is required and must be between 0 and 59" }, { status: 400 });
    }

    //get the game from the database
    const storedGameList = await SelectQuery<TimerGame>("SELECT * FROM timer WHERE user = ?", [user]);
    if (storedGameList.length === 0) {
        return NextResponse.json({ error: "Game not found" }, { status: 204 });
    }
    const storedGame = storedGameList[0];
    console.log(`current round: ${storedGame.currentRound}, round: ${round}`);
    if (round != storedGame.currentRound) {
        return NextResponse.json({ error: "Cannot make a guess on a non-current round" }, { status: 400 });
    }

    //get the round specified from the database
    const storedRoundList = await SelectQuery<TimerRound>("SELECT * FROM timer_round WHERE id = ? AND round = ?", [user, round]);
    if (storedRoundList.length === 0) {
        return NextResponse.json({ error: "Round not found" }, { status: 204 });
    }
    const storedRound = storedRoundList[0];
    if (storedRound.status !== 'In Progress') {
        return NextResponse.json({ error: "Round is not in progress" }, { status: 400 });
    }
    storedRound.guess = time;
    //check if the number guessed is correct
    if (time === storedRound.spawnTime) {
        storedRound.status = 'Correct';
    }
    else {
        storedRound.status = 'Incorrect';
    }

    if (storedGame.rounds !== round) {
        storedGame.currentRound++;
    }
    //update the round in the database
    const updateResult = await UpdateQuery("UPDATE timer_round SET ? WHERE id = ? AND round = ?", [storedRound, user, round]);
    if (updateResult.warningStatus === 0) {
        //update the game in the database
        const updateGameResult = await UpdateQuery("UPDATE timer SET ? WHERE user = ?", [storedGame, user]);
        if (updateGameResult.warningStatus !== 0) {
            return NextResponse.json({ error: "Failed to update game" }, { status: 500 });
        }
        //get all the rounds for the game up to this point
        const completeGame = await getFullTimerGame(user);
        return NextResponse.json(completeGame, { status: 200 });
    }
    else {
        return NextResponse.json({ error: "Failed to update round" }, { status: 500 });
    }
}