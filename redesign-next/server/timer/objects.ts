export interface TimerGame {
    id: string;
    user: string;
    rounds: number;
    currentRound: number;
    items: string[];
    game: string;
}

export interface TimerCreateGame {
    rounds: number;
    game: QuakeGame;
    items: string[];
}

export interface TimerRound {
    id: string;
    gameId: string;
    item: string; //move into an enum
    startTime: number;
    spawnTime: number;
    round: number;
    guess?: number;
    status: string; //move into an enum
}

export interface TimerFullGame {
    game: TimerGame;
    rounds: TimerRound[];
}

export enum QuakeGame {
    QuakeLive,
    QuakeChampions
}

export const gameRecord: Record<string, QuakeGame> = {
    "Quake Live": QuakeGame.QuakeLive,
    "Quake Champions": QuakeGame.QuakeChampions
};