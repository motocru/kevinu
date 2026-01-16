import { UpdateQuery } from "@/server/db";
import { getGameById } from "@/server/wordgame/setup";
import { NextResponse } from "next/server";

function replaceCharAt(phrase: string, answer: string, char: string) {
    var newPhrase = phrase;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === char) {
            newPhrase = newPhrase.substring(0, i) + char + newPhrase.substring(i + 1);
        }
    }
    return newPhrase;
}

export async function GET(request: Request, { params }: { params: Promise<{ user: string, id: string }> }) {
    const { user, id } = await params;
    const game = await getGameById(id, user);
    if (game) {
        return NextResponse.json(game, { status: 200 });
    }
    else {
        return NextResponse.json({ error: "Game not found" }, { status: 204 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ user: string, id: string }> }) {
    const { user, id } = await params;
    const { guess } = await request.json() as { guess: string };
    if (!guess) {
        return NextResponse.json({ error: "Guess is required" }, { status: 400 });
    }
    const game = await getGameById(id, user);
    if (game) {
        //game is found, start checking if the game is able to be updated
        if (game.status !== "In Progress" || game.answer === game.phrase) {
            return NextResponse.json({ error: "Game is already completed" }, { status: 400 });
        }
        //check if the guess is valid
        if (guess.length > 1 || guess.length < 1) {
            return NextResponse.json({ error: "Guess must be a single letter" }, { status: 400 });
        }
        if (game.phrase.includes(guess) || game.guesses?.includes(guess)) {
            return NextResponse.json({ error: "Guess has already been made" }, { status: 400 });
        }
        //determine if the guess is correct and then update the game
        game.guesses += guess;
        if (game.answer?.includes(guess)) {
            game.phrase = replaceCharAt(game.phrase, game.answer, guess);
            if (game.phrase === game.answer) {
                game.status = "Victory";
            }
        }
        else {
            game.remaining--;
            if (game.remaining <= 0) {
                game.status = "Loss";
            }
        }
        //update the game in the database
        const result = await UpdateQuery("UPDATE wordgame SET ? WHERE id = ?", [game, id]);
        if (result.warningStatus === 0) {
            if (game.status === 'In Progress') {
                delete game.answer;
            }
            return NextResponse.json(game, { status: 200 });
        }
        else {
            return NextResponse.json({ error: "Failed to update game" }, { status: 500 });
        }
    }
    else {
        return NextResponse.json({ error: "Game not found" }, { status: 204 });
    }
}