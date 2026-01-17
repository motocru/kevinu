"use client";
import { useState } from "react";
import "./timer.css";

interface TimerGame {
    id: string;
    user: string;

}

export default function Timer() {
    const [currentGame, setCurrentGame] = useState<TimerGame | null>(null);
    const [playerId] = useState(() => crypto.randomUUID());
    const [selectedGame, setSelectedGame] = useState("Quake Live");
    const gameOptions = ["Quake Live", "Quake Champions"];
    const [rounds, setRounds] = useState(5);
    const roundsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div>
            <h1>Timer</h1>
            <p className="pl-7 text-lg">A game for testing your timer knowledge on Quake Live and Quake Champions</p>
            <div className="timer-content">
                <div className="timer-settings">
                    <div className="game-selection">
                        <label>Game:</label>
                        <select className="select-input" value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
                            {gameOptions.map((game) => (
                                <option key={game} value={game}>{game}</option>
                            ))}
                        </select>
                    </div>
                    <div className="rounds-selection">
                        <label>Rounds:</label>
                        <select className="select-input" value={rounds} onChange={(e) => setRounds(Number(e.target.value))}>
                            {roundsOptions.map((rounds) => (
                                <option key={rounds} value={rounds}>{rounds}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="timer-settings">
                    {/* TODO: Add items to be timed */}
                </div>
                <div className="timer-settings">
                    {/* TODO: Add start button */}
                </div>
                <div className="timer-game">
                    {/* TODO: Add game area */}
                </div>
            </div>
        </div>
    );
}