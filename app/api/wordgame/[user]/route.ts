import { SelectQuery, InsertQuery } from "@/server/db";
import { NextResponse } from "next/server";
import { GameData, GameRow, getGameById, getWordlist, levelData, NewGameBody } from "@/lib/setup";


function wordPick(level: levelData) {
    const wordlist = getWordlist();
    function getInt() {
        return Math.floor(Math.random() * Math.floor(wordlist.length));
    }
    var pick = wordlist[getInt()];
    while (pick.length < level.minLength || pick.length > level.maxLength) {
        pick = wordlist[getInt()];
    }
    return pick;
}

//GET all games for a specific user id
export async function GET(request: Request, { params }: { params: Promise<{ user: string }> }) {
    const { user } = await params;
    const result = await SelectQuery<GameRow>("SELECT * FROM wordgame WHERE user = ?", [user]);
    result.forEach((game) => {
        if (game.status === "In Progress") {
            delete game.answer;
        }
    });
    return NextResponse.json(result, { status: 200 });
}

//POST a new game for a specific user id
export async function POST(request: Request, { params }: { params: Promise<{ user: string }> }) {
    const { user } = await params;
    const gameBody: NewGameBody = await request.json();

    //get a word based on the level
    const level = levelData[gameBody.level];
    const word = wordPick(level);
    const gameID = crypto.randomUUID();

    //create the game object
    const game: GameData = {
        user: user,
        id: gameID,
        level: gameBody.level,
        phrase: word.replace(/./g, "_").toString(),
        remaining: level.rounds,
        answer: word.toString(),
        status: "In Progress",
        font: gameBody.font,
        textColor: gameBody.textColor,
        bgColor: gameBody.bgColor,
        guessColor: gameBody.guessColor
    };
    //insert the game into the database
    const result = await InsertQuery("INSERT INTO wordgame SET ?", game);
    if (result.warningStatus === 0) {
        const game = await getGameById(gameID, user);
        if (game) {
            delete game.answer;
        }
        return NextResponse.json(game, { status: 200 });
    }
    else {
        return NextResponse.json({ error: "Failed to create game" }, { status: 500 });
    }
}