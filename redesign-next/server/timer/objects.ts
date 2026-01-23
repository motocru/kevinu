export interface TimerGame {
    id: string;
    user: string;
    rounds: number;
    currentRound: number;
    items: string[]; //WILL NEED TO EVALUATE IF THIS WORKS IN RETRIEVAL
}

export interface TimerRound {
    id: string;
    item: string; //move into an enum
    startTime: number;
    spawnTime: number;
    round: number;
    guess: number;
    status: string; //move into an enum
}

export interface TimerFullGame {
    game: TimerGame;
    rounds: TimerRound[];
}