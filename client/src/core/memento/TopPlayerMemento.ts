import ILeaderboardUser from '../interfaces/ILeaderboardUser';
import { Memento } from "./IMomento";

export class TopPlayerMemento implements Memento {
    private state: ILeaderboardUser;
    private date: string;

    constructor(state: ILeaderboardUser) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    public getState(): ILeaderboardUser {
        return this.state;
    }

    public getName(): string {
        return `${this.date} / ${this.state.username} / ${this.state.score} `;
    }

    public getDate(): string {
        return this.date;
    }
}