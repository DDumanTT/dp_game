import ILeaderboardUser from '../interfaces/ILeaderboardUser';
import { Memento } from "./IMomento";


/**
 * The Concrete Memento contains the infrastructure for storing the Originator's
 * state.
 */
export class TopPlayerMemento implements Memento {
    private state: ILeaderboardUser;
    private date: string;

    constructor(state: ILeaderboardUser) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    /**
     * The Originator uses this method when restoring its state.
     */
    public getState(): ILeaderboardUser {
        return this.state;
    }

    /**
     * The rest of the methods are used by the Caretaker to display metadata.
     */
    public getName(): string {
        return `${this.date} / ${this.state.username} / ${this.state.score} `;
    }

    public getDate(): string {
        return this.date;
    }
}



/**
 * Client code.
 */
// const originator = new Originator('Super-duper-super-puper-super.');
// const caretaker = new Caretaker(originator);

// caretaker.backup();
// originator.doSomething();

// caretaker.backup();
// originator.doSomething();

// caretaker.backup();
// originator.doSomething();

// console.log('');
// caretaker.showHistory();

// console.log('\nClient: Now, let\'s rollback!\n');
// caretaker.undo();

// console.log('\nClient: Once more!\n');
// caretaker.undo();