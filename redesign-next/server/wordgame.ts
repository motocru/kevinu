import { RowDataPacket } from "mysql2";
import { SelectQuery, InsertQuery, UpdateQuery, DeleteQuery } from "./db";

import express from "express";

const router = express.Router();

interface Game extends RowDataPacket {
    user: string;
    id: string;
    level: number;
    phrase: string;
    remaining: number;
    answer: string;
    status: string;
    font: string;
    textColor: string;
    bgColor: string;
    guessColor: string;
}

async function createGame(game: Game) {
    //TODO: this will need to be tested
    const result = await InsertQuery("INSERT INTO games SET ?", game);
    console.log(result);
}

async function getGameById(id: string) {
    const result = await SelectQuery("SELECT * FROM games WHERE id = ?", [id]);
    return result[0];
}

//gets all the games for a specific user
router.get("/:user", async (req, res) => {
    const game = await getGameById(req.params.user);
    res.json(game);
});

//gets the details for a specific user and game
router.get("/:user/:id", async (req, res) => {
    const games = await getGamesByUser(req.params.user, req.params.id);
    res.json(games);
});

//creates a new game for the specified user
router.post("/:user", async (req, res) => {
    const game = await createGame(req.body);
    res.json(game);
});

async function getGamesByUser(user: string, id: string) {
    const result = await SelectQuery("SELECT * FROM games WHERE user = ?", [user]);
    return result;
}

export { router };