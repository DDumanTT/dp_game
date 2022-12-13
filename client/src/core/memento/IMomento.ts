import ILeaderboardUser from "../interfaces/ILeaderboardUser";

export interface Memento {
    getState(): ILeaderboardUser;
    getName(): string;
    getDate(): string;
}