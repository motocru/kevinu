"use client";
import { FormEvent, useState } from "react";
import "./timer.css";
import { gameRecord, QuakeGame, TimerCreateGame, TimerFullGame } from "@/server/timer/objects";
import { setToast, Toast } from "@/components/toast/toastFunction";
import ToastList from '@/components/toast/ToastList/toastList';

export default function Timer() {
    const [currentGame, setCurrentGame] = useState<TimerFullGame | null>(null);
    const [playerId] = useState(() => crypto.randomUUID());
    const [selectedGame, setSelectedGame] = useState(QuakeGame.QuakeLive);
    const [rounds, setRounds] = useState(5);
    const [megaHealth, setMegaHealth] = useState(false);
    const [heavyArmor, setHeavyArmor] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [currentRound, setCurrentRound] = useState<number>(0);
    const [guess, setGuess] = useState<number>(0);

    const roundsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    async function createGame() {
        const items: string[] = [];
        if (megaHealth) {
            items.push('Mega');
        }
        if (heavyArmor) {
            items.push('Heavy');
        }
        if (items.length === 0) {
            const toast: Toast = {
                id: Date.now().toString(),
                message: "Please select at least one item",
                type: "failure"
            };
            setToast(toast, setToasts);
            return;
        }

        //TODO: delete previous game if exists
        //build new timer game body
        const body: TimerCreateGame = {
            rounds: rounds,
            game: selectedGame,
            items: items
        };
        const response = await fetch(`/api/timer/${playerId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        if (response.status !== 200) {
            const toast: Toast = {
                id: Date.now().toString(),
                message: "Failed to create game",
                type: "failure"
            };
            setToast(toast, setToasts);
            return;
        }
        const data = await response.json();
        console.log(data);
        setCurrentGame(data);
    };

    async function submitGuess(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`/api/timer/${playerId}/${currentRound}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ time: guess })
        });
        //clear out the guess once we are back from the fetch
        setGuess(0);
        //verify the response and then update the current game and round
        if (response.status !== 200) {
            const toast: Toast = {
                id: Date.now().toString(),
                message: "Failed to submit guess",
                type: "failure"
            };
            setToast(toast, setToasts);
            return;
        }
        const data = await response.json();
        console.log(data);
        setCurrentGame(data);
        setCurrentRound(currentGame?.game.currentRound!);
    }

    const removeToast = (id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
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
                        {selectedGame === QuakeGame.QuakeLive && (
                            <div className="item-selection">
                                <input type="checkbox" id="heavyArmor" name="heavyArmor" value="Heavy Armor" onChange={(e) => setHeavyArmor(e.target.checked)} />
                                <label htmlFor="heavyArmor">Heavy Armor<p>(25 seconds)</p></label>
                            </div>
                        )}
                        <button className="new-game-button" onClick={() => createGame()}>New Game</button>
                    </div>
                </div>
                {/* TODO: Add game area */}
                {currentGame && (
                    <div className="timer-game">
                        {(currentGame.game.currentRound !== currentGame.game.rounds ||
                            currentGame.rounds[currentGame.game.rounds - 1].status !== "In Progress") && (
                                <div>
                                    <div className="item-pickup-time-display inline-content">
                                        <p>Item: <strong>{currentGame.rounds[currentRound].item}</strong></p>
                                        <p>Pickup Time: <strong>{currentGame.rounds[currentRound].startTime}</strong></p>
                                    </div>
                                    <div className="timer-game-guesser inline-content">
                                        <form onSubmit={(e) => submitGuess(e)}>
                                            <label htmlFor="spawnTime" style={{ fontSize: "1.75rem", padding: "0.5rem" }}>Spawn Time:</label>
                                            <input type="number" id="spawnTime" name="spawnTime" onChange={(e) => setGuess(Number(e.target.value))} />
                                            <span style={{ padding: "0.5rem" }}></span>
                                            <button type="submit">Submit</button>
                                        </form>
                                        <style jsx>{`
                                    .timer-game-guesser button {
                                        padding: 0.5rem;
                                        font-weight: bold;
                                        font-size: 1rem;
                                        border: 2px solid #000000;
                                        border-radius: 6px;
                                        background-color: ${currentGame.rounds[currentRound].item === "Mega"
                                                ? "#2888f6" : currentGame.rounds[currentRound].game === "Quake Live"
                                                    ? "#fa1a25" : "#00dd2c"};
                                        color: #eae9e9;
                                        cursor: pointer;
                                        transition: background-color 0.5s ease;
                                    }
                                    .timer-game-guesser button:hover {
                                        background-color: ${currentGame.rounds[currentRound].item === "Mega"
                                                ? "#2677d3" : currentGame.rounds[currentRound].game === "Quake Live"
                                                    ? "#920f15" : "#00aa22"};
                                    }
                                `}</style>
                                    </div>
                                </div>
                            )}
                        <div className="timer-game-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Round</th>
                                        <th>Item</th>
                                        <th>Spawn Time</th>
                                        <th>Guess</th>
                                        <th>Actual</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentGame.rounds.map((round, index) => (
                                        <tr key={index}>
                                            <td>{round.round}</td>
                                            <td>{round.item}</td>
                                            <td>{round.startTime}</td>
                                            <td>{round.guess}</td>
                                            <td>{round.spawnTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <ToastList data={toasts} position="bottom-right" removeToast={removeToast} />
            </div>
        </div>
    );
}