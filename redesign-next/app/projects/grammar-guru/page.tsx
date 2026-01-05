"use client";
import './gg.css';
import { useState } from "react";
import Modal from "@/components/modal/modal";

export interface Game {
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

    //consts for the game
    const fontOptions = ["Arial", "Times New Roman", "Courier New", "Verdana", "Georgia",
        "Comic Sans MS", "Impact", "Lucida Sans Unicode", "Trebuchet MS", "Arial Black"];
    const levelOptions = [{ value: 0, label: "Easy" }, { value: 1, label: "Medium" }, { value: 2, label: "Hard" }];
    const playerId = crypto.randomUUID();

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

        var newGameResponse = await fetch(`http://localhost:3001/wordgame/${playerId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newGame),
        });

        if (newGameResponse.ok) {
            const newGameJson = await newGameResponse.json();
            setCurrentGame(newGameJson);
        } else {
            console.log("Failed to create game");
            //TODO: show an error toast here
        }

        //now fetch all games for the user
        const playerGames = await fetch(`http://localhost:3001/wordgame/${playerId}`);
        const playerGamesJson = await playerGames.json();
        games.length = 0;
        setGames(playerGamesJson);

        //pop open the modal for the new game
        setShowModal(true);
    }

    //gets the game
    async function getGame(gameId: string) {
        const game = await fetch(`http://localhost:3001/wordgame/${playerId}/${gameId}`);
        const gameJson = await game.json();
        console.log(gameJson);
        setCurrentGame(gameJson);
        setShowModal(true);
    }

    async function submitGuess() {

    }

    return (
        <div>
            <h1>Grammar Guru</h1>
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
                        <button className="new-game-button" onClick={createGame}>New Game</button>
                    </div>
                </div>
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
                                <tr key={key} onClick={() => getGame(game.id)}>
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
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={submitGuess}>
                        <input type="text" maxLength={1} value={guess} onChange={(e) => setGuess(e.target.value)} />
                        <button type="submit">Guess</button>
                    </form>
                </Modal>
            )}
        </div>
    );
}