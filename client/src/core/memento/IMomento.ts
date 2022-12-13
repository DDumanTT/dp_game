import ILeaderboardUser from "../interfaces/ILeaderboardUser";

/**
 * The Memento interface provides a way to retrieve the memento's metadata, such
 * as creation date or name. However, it doesn't expose the Originator's state.
 */
export interface Memento {
    getState(): ILeaderboardUser;
    getName(): string;
    getDate(): string;
}