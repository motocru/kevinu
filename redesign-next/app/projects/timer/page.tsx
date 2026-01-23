"use client";
import { useState } from "react";
import "./timer.css";

interface TimerGame {
    id: string;
    user: string;

}

enum Game {
    QuakeLive,
    QuakeChampions
}

export default function Timer() {
    const [currentGame, setCurrentGame] = useState<TimerGame | null>(null);
    const [playerId] = useState(() => crypto.randomUUID());
    const [selectedGame, setSelectedGame] = useState(Game.QuakeLive);
    const [rounds, setRounds] = useState(5);
    const [megaHealth, setMegaHealth] = useState(false);
    const [heavyArmor, setHeavyArmor] = useState(false);

    const roundsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const gameRecord: Record<string, Game> = {
        "Quake Live": Game.QuakeLive,
        "Quake Champions": Game.QuakeChampions
    };

    async function createGame() {

        setCurrentGame({
            id: crypto.randomUUID(),
            user: playerId
        });
    };
    return (
        <div>
            <h1>Timer</h1>
            <p className="pl-7 text-lg">A game for testing your timer knowledge on Quake Live and Quake Champions</p>
            <div className="timer-content">
                <div className="timer-settings">
                    <div className="game-selection">
                        <label>Game:</label>
                        <select className="select-input" value={selectedGame} onChange={(e) => { setSelectedGame(Number(e.target.value)) }}>
                            {Object.entries(gameRecord).map(([key, value]) => (
                                <option key={key} value={value}>{key}</option>
                            ))}
                        </select>
                    </div>
                    |
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
                    <div className="item-selection">
                        <label>Item(s):</label>
                        <input type="checkbox" id="megaHealth" name="megaHealth" value="Mega Health" onChange={(e) => setMegaHealth(e.target.checked)} />
                        <label htmlFor="megaHealth">Mega Health<p>(35 seconds)</p></label>
                        {selectedGame === Game.QuakeLive && (
                            <div className="item-selection">
                                <input type="checkbox" id="heavyArmor" name="heavyArmor" value="Heavy Armor" onChange={(e) => setHeavyArmor(e.target.checked)} />
                                <label htmlFor="heavyArmor">Heavy Armor<p>(25 seconds)</p></label>
                            </div>
                        )}
                        <button className="new-game-button" onClick={() => createGame()}>New Game</button>
                    </div>
                </div>
                <div className="timer-settings pt-2">

                </div>
                <div className="timer-game">
                    {/* TODO: Add game area */}
                </div>
            </div>
        </div>
    );
}