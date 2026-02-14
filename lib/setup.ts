import fs from "fs";
import path from "path";
import { RowDataPacket } from "mysql2";
import { SelectQuery } from "@/server/db";

//building the wordlist we pull from
var wordlist: string[] = [];

function getWordlist() {
    if (wordlist.length === 0) {
        const filePath = path.join(process.cwd(), 'lib', 'wordlist.txt');
        var data = fs.readFileSync(filePath);
        wordlist = data.toString().split(/\r?\n/);
        return wordlist;
    } else {
        return wordlist;
    }
}

export { getWordlist };

//interfaces for game objects
export interface GameData {
    user: string;
    id: string;
    level: number;
    phrase: string;
    remaining: number;
    answer?: string;
    status: 'In Progress' | 'Victory' | 'Loss';
    font: string;
    textColor: string;
    bgColor: string;
    guessColor: string;
    guesses?: string;
}

export interface GameRow extends GameData, RowDataPacket {
    insertTime: Date;
}

export interface NewGameBody {
    level: number;
    font: string;
    textColor: string;
    bgColor: string;
    guessColor: string;
}

export interface levelData {
    minLength: number;
    maxLength: number;
    rounds: number;
}

export const levelData: levelData[] = [
    { minLength: 3, maxLength: 5, rounds: 8 },
    { minLength: 4, maxLength: 10, rounds: 7 },
    { minLength: 9, maxLength: 300, rounds: 6 },
];

export async function getGameById(id: string, user: string) {
    const result = await SelectQuery<GameRow>("SELECT * FROM wordgame WHERE id = ? AND user = ?", [id, user]);
    if (result.length === 0) {
        return null;
    }
    const game = result[0];
    return game;
}