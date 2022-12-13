import ILeaderboardUser from "../interfaces/ILeaderboardUser";
import { Memento } from "./IMomento";
import { TopPlayerMemento } from "./TopPlayerMemento";


 export class Originator {
    private state: ILeaderboardUser;

    constructor(state: ILeaderboardUser) {
        this.state = state;
    }

    public addTopPlayer(topPlayer: ILeaderboardUser): void {
        this.state = topPlayer;
    }

    public save(): Memento {
        return new TopPlayerMemento(this.state);
    }

    public restore(memento: Memento): void {
        this.state = memento.getState();
    }
}