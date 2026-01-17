"use client";
import './gg.css';
import { useState } from "react";
import Modal from "@/components/modal/modal";
import { setToast, Toast } from '@/components/toast/toastFunction';
import ToastList from '@/components/toast/ToastList/toastList';

export interface Game {
    id: string;
    level: number;
    phrase: string;
    remaining: number;
    guesses?: string;
    answer?: string;
    status: string;
    font: string;
    textColor: string;
    bgColor: string;
    guessColor: string;
}

interface NewGameBody {
    level: number;
    font: string;
    textColor: string;
    bgColor: string;
    guessColor: string;
}

export default function GrammarGuru() {
    //settings values that need to be set
    const [font, setFont] = useState("Arial");
    const [textColor, setTextColor] = useState("#5142f5");
    const [bgColor, setBgColor] = useState("#782310");
    const [guessColor, setGuessColor] = useState("#237526");
    const [level, setLevel] = useState(1);
    const [games, setGames] = useState<Game[]>([]);
    const [currentGame, setCurrentGame] = useState<Game | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);
    const [guess, setGuess] = useState("");
    const [toasts, setToasts] = useState<Toast[]>([]);

    //consts for the game
    const fontOptions = ["Arial", "Times New Roman", "Courier New", "Verdana", "Georgia",
        "Comic Sans MS", "Impact", "Lucida Sans Unicode", "Trebuchet MS", "Arial Black"];
    const levelOptions = [{ value: 0, label: "Easy" }, { value: 1, label: "Medium" }, { value: 2, label: "Hard" }];
    const [playerId] = useState(() => crypto.randomUUID());

    //creates the game
    async function createGame() {
        //build detail to send to server
        const newGame: NewGameBody = {
            level: level,
            font: font,
            textColor: textColor,
            bgColor: bgColor,
            guessColor: guessColor
        };

        var newGameResponse = await fetch(`/api/wordgame/${playerId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newGame),
        });

        const newGameJson = await newGameResponse.json();
        if (newGameResponse.ok) {
            setCurrentGame(newGameJson);
        } else {
            const toast: Toast = {
                id: Date.now().toString(),
                message: newGameJson.error,
                type: "failure"
            };
            setToast(toast, setToasts);
        }

        //now fetch all games for the user
        const playerGames = await fetch(`/api/wordgame/${playerId}`);
        const playerGamesJson = await playerGames.json();
        games.length = 0;
        setGames(playerGamesJson);

        //pop open the modal for the new game
        setShowModal(true);
    }

    //gets the game
    async function getGame(gameId: string) {
        const game = await fetch(`/api/wordgame/${playerId}/${gameId}`);
        const gameJson = await game.json();
        if (game.status !== 200) {
            const toast: Toast = {
                id: Date.now().toString(),
                message: gameJson.error,
                type: "failure"
            };
            setToast(toast, setToasts);
            return;
        }
        setCurrentGame(gameJson);
        setShowModal(true);
    }

    async function submitGuess(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (currentGame) {
            const game = await fetch(`/api/wordgame/${playerId}/${currentGame.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ guess: guess }),
            });
            const gameJson = await game.json();
            if (game.status !== 200) {
                console.log("Failed to submit guess");
                const toast: Toast = {
                    id: Date.now().toString(),
                    message: gameJson.error,
                    type: "failure"
                };
                setToast(toast, setToasts);
                return;
            }
            setCurrentGame(gameJson);

            //get all the games for the user to update the list and clear the guess input
            const playerGames = await fetch(`/api/wordgame/${playerId}`);
            const playerGamesJson = await playerGames.json();
            games.length = 0;
            setGames(playerGamesJson);
            setGuess("");
        }
    }

    const removeToast = (id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <div>
            <h1>Grammar Guru</h1>
            <p className='pl-7 text-lg'>A game of hangman with a few extra bells and whistles</p>
            <div className="gg-content">
                {/* box for game settings */}
                <div className="sunken-box">
                    {/* font section */}
                    <div className="setting-section">
                        <label>Font:</label>
                        <select value={font} onChange={(e) => setFont(e.target.value)}>
                            {fontOptions.map((font) => (
                                <option key={font} value={font}>{font}</option>
                            ))}
                        </select>
                    </div>
                    {/* Color section */}
                    <div className="setting-section">
                        <label>Text :</label>
                        <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                        <label>Body:</label>
                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                        <label>Guess:</label>
                        <input type="color" value={guessColor} onChange={(e) => setGuessColor(e.target.value)} />
                    </div>
                    {/* level section */}
                    <div className="setting-section">
                        <label>Level:</label>
                        <select value={level} onChange={(e) => setLevel(Number(e.target.value))}>
                            {levelOptions.map((level) => (
                                <option key={level.value} value={level.value}>{level.label}</option>
                            ))}
                        </select>
                    </div>
                    {/* start button */}
                    <div className="setting-section" style={{ justifyContent: "flex-end" }}>
                        {/* TODO: need some form of loading spinner to show while creating game */}
                        <button className="new-game-button" onClick={createGame}>New Game</button>
                    </div>
                </div>
                <ToastList data={toasts} position="bottom-right" removeToast={removeToast} />
                {/* game table */}
                <div className="game-area">
                    <table>
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Phrase</th>
                                <th>Remaining</th>
                                <th>Answer</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((game, key) => (
                                <tr key={key} onClick={async () => await getGame(game.id)}>
                                    <td>{levelOptions.find((level) => level.value === game.level)?.label}</td>
                                    <td className="letters">{game.phrase}</td>
                                    <td>{game.remaining}</td>
                                    <td>{game.answer}</td>
                                    <td>{game.status}</td>
                                    <style jsx>{`
                                        .letters {
                                            letter-spacing: 10px;
                                            color: ${game.textColor};
                                            background-color: ${game.bgColor};
                                            font-family: ${game.font};
                                            font-size: 20px;
                                        }
                                    `}</style>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* game modal */}
            {showModal && (
                <Modal onClose={() => setShowModal(false)} header={`Guesses left: ${currentGame?.remaining ?? 0}`} showModal={showModal}>
                    <form onSubmit={submitGuess}>
                        <div className='input-inline' style={{ justifyContent: "center" }}>
                            <div className='pt-1'>
                                <label className="p-2 text-xl" htmlFor="guess">Guess:</label>
                                <input id="guess" className='guess-input' type="text" maxLength={1} value={guess} onChange={(e) => setGuess(e.target.value)} />
                            </div>
                            <div className='p-4'></div>
                            <button type="submit" className="text-xl guess-submit">Submit</button>
                        </div>
                        <div className="input-inline">
                            {/* TODO: make each of the letters it's own thing with a background color and font size etc. */}
                            <h2 className='p-2 view-text'>Current View: {currentGame?.phrase.split("").map((letter, key) => (
                                <span key={key} className='guess-letter' style={{ color: currentGame?.textColor }}>{letter}</span>
                            ))}</h2>
                            <h2 className="p-2 view-text">
                                Letters Guessed:
                                <span className='guess-letters' style={{ fontFamily: currentGame?.font }}>
                                    {currentGame?.guesses?.split("").map((guess, key) => (
                                        <span key={key} className='guess-letter' style={{ color: currentGame?.guessColor }}>{guess}</span>
                                    ))}
                                </span>
                            </h2>
                        </div>
                        <h2 className="p-2">Status: {currentGame?.status}</h2>
                    </form>
                    <style jsx>{`
                        .guess-letter {
                            display: inline-block;
                            padding: 2px 4px;
                            margin: 2px;
                            background-color: ${currentGame?.bgColor};
                            font-family: ${currentGame?.font};
                        }
                    `}</style>
                </Modal>
            )}
        </div>
    );
}