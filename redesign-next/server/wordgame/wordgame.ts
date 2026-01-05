import { RowDataPacket } from "mysql2";
import { SelectQuery, InsertQuery, UpdateQuery, DeleteQuery } from "../db";
import fs from "fs";
import express from "express";

const router = express.Router();

var wordlist: string[] = [];
fs.readFile(require('path').resolve(__dirname, './wordlist.txt'), function (err, data) {
    wordlist = data.toString().split('\n');
});

interface GameData {
    user: string;
    id: string;
    level: number;
    phrase: string;
    remaining: number;
    answer?: string;
    status: string;
    font: string;
    textColor: string;
    bgColor: string;
    guessColor: string;
}

interface GameRow extends GameData, RowDataPacket {
    insertTime: Date;
}

interface NewGameBody {
    level: number;
    font: string;
    textColor: string;
    bgColor: string;
    guessColor: string;
}

interface levelData {
    minLength: number;
    maxLength: number;
    rounds: number;
}

const levelData: levelData[] = [
    { minLength: 3, maxLength: 5, rounds: 8 },
    { minLength: 4, maxLength: 10, rounds: 7 },
    { minLength: 9, maxLength: 300, rounds: 6 },
];

async function getGameById(id: string, user: string) {
    const result = await SelectQuery<GameRow>("SELECT * FROM wordgame WHERE id = ? AND user = ?", [id, user]);
    if (result.length === 0) {
        return null;
    }
    const game = result[0];
    if (game.status === "In Progress") {
        delete game.answer;
    }
    return game;
}

function wordPick(level: levelData) {
    function getInt() {
        return Math.floor(Math.random() * Math.floor(wordlist.length));
    }
    var pick = wordlist[getInt()];
    while (pick.length < level.minLength || pick.length > level.maxLength) {
        pick = wordlist[getInt()];
    }
    return pick;
}

//creates a new game for the specified user
router.post("/:user", async (req, res) => {
    const gameBody: NewGameBody = req.body;
    //get a word based on the level
    const level = levelData[gameBody.level];
    const word = wordPick(level);
    const gameID = crypto.randomUUID();
    const game: GameData = {
        user: req.params.user,
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
    const result = await InsertQuery("INSERT INTO wordgame SET ?", game);
    if (result.warningStatus === 0) {
        const game = await getGameById(gameID, req.params.user);
        res.json(game);
    }
    else {
        res.status(500).json({ error: "Failed to create game" });
    }
});

//gets all the games for a specific user
router.get("/:user", async (req, res) => {
    const result = await SelectQuery<GameRow>("SELECT * FROM wordgame WHERE user = ?", [req.params.user]);
    result.forEach(game => {
        if (game.status === "In Progress") {
            delete game.answer;
        }
    });
    res.json(result);
});

//gets the details for a specific user and game
router.get("/:user/:id", async (req, res) => {
    const game = await getGameById(req.params.id, req.params.user);
    if (game) {
        res.json(game);
    }
    else {
        res.status(204);
    }
});

export { router };