import ILeaderboardUser from "../interfaces/ILeaderboardUser";
import { Memento } from "./IMomento";
import { TopPlayerMemento } from "./TopPlayerMemento";

/**
 * The Originator holds some important state that may change over time. It also
 * defines a method for saving the state inside a memento and another method for
 * restoring the state from it.
 */
 export class Originator {
    /**
     * For the sake of simplicity, the originator's state is stored inside a
     * single variable.
     */
    private state: ILeaderboardUser;

    constructor(state: ILeaderboardUser) {
        this.state = state;
        // console.log(`Originator: My initial state is: ${state}`);
    }

    /**
     * The Originator's business logic may affect its internal state. Therefore,
     * the client should backup the state before launching methods of the
     * business logic via the save() method.
     */
    public addTopPlayer(topPlayer: ILeaderboardUser): void {
        // console.log('Originator: I\'m doing something important.');
        this.state = topPlayer;
        // console.log(`Originator: and my state has changed to: ${this.state}`);
    }

    /**
     * Saves the current state inside a memento.
     */
    public save(): Memento {
        return new TopPlayerMemento(this.state);
    }

    /**
     * Restores the Originator's state from a memento object.
     */
    public restore(memento: Memento): void {
        this.state = memento.getState();
        // console.log(`Originator: My state has changed to: ${this.state}`);
    }
}