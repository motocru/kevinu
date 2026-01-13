import { RowDataPacket } from "mysql2";
import { SelectQuery, InsertQuery, UpdateQuery, DeleteQuery } from "../db";
import fs from "fs";
import express from "express";

const router = express.Router();

var wordlist: string[] = [];
fs.readFile(require('path').resolve(__dirname, './wordlist.txt'), function (err, data) {
    wordlist = data.toString().split(/\r?\n/);
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
    guesses?: string;
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
    console.log(id, user);
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

function replaceCharAt(phrase: string, answer: string, char: string) {
    var newPhrase = phrase;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === char) {
            newPhrase = newPhrase.substring(0, i) + char + newPhrase.substring(i + 1);
        }
    }
    return newPhrase;
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
        res.status(200).json(game);
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
    res.status(200).json(result);
});

//gets the details for a specific user and game
router.get("/:user/:id", async (req, res) => {
    const game = await getGameById(req.params.id, req.params.user);
    if (game !== null) {
        res.json(game);
        return;
    }
    else {
        res.sendStatus(204);
        return;
    }
});

router.put('/:user/:id', async (req, res) => {
    if (!req.query.guess) {
        res.status(400).json({ error: "Missing guess" });
        return;
    }
    const game = await getGameById(req.params.id, req.params.user);
    if (game) {
        //necessary checks to determine if the guess is valid
        if (game.status !== "In Progress" || game.answer === game.phrase) {
            res.status(400).json({ error: "Game is already completed" });
            return;
        }
        const guess = req.query.guess.toString();
        if (guess.length > 1) {
            res.status(400).json({ error: "Guess must be a single letter" });
            return;
        }
        if (game.phrase.includes(guess) || game.guesses?.includes(guess)) {
            res.status(400).json({ error: "Guess already made" });
            return;
        }
        //determine if the guess is correct
        game.guesses = game.guesses + guess;
        if (game.answer?.includes(guess)) {
            game.phrase = replaceCharAt(game.phrase, game.answer, guess);
            if (game.phrase === game.answer) {
                game.status = "Victory";
            }
        } else {
            game.remaining--;
            if (game.remaining <= 0) {
                game.status = "Loss";
            }
        }
        //update the game
        const result = await UpdateQuery("UPDATE wordgame SET ? WHERE id = ? AND user = ?", [game, req.params.id, req.params.user]);
        if (result.warningStatus === 0) {
            res.json(game);
        }
        else {
            res.status(500).json({ error: "Failed to update game" });
        }
    }
    else {
        res.sendStatus(204);
    }
})

export { router };