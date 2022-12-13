import { isThisTypeNode } from "typescript";
import { Memento } from "./IMomento";
import { Originator } from "./Originator";

 export class Caretaker {
    private mementos: Memento[] = [];

    private originator: Originator;

    constructor(originator: Originator) {
        this.originator = originator;
    }

    public backup(): void {
        // console.log('\nCaretaker: Saving Originator\'s state...');
        const momento = this.originator.save();
        // console.log(momento)
        this.mementos.push(momento);
    }

    public undo(): void {
        if (!this.mementos.length) {
            return;
        }
        const memento = this.mementos.pop();

        if(memento === undefined){
            throw Error("Momento is undefined");
        }
        // console.log(`Caretaker: Restoring state to: ${memento.getName()}`);
        this.originator.restore(memento);
    }

    public showHistory(): void {
        // console.log('Caretaker: Here\'s the list of mementos:');
        for (const memento of this.mementos) {
            console.log(memento.getName());
        }
    }

    public hasMomentos():boolean{
        return this.mementos !== undefined && this.mementos.length > 0;
    }

    public returnList():Array<string>{
        return this.mementos.map(x => {
            return x.getName();
        })
    }

    // public revertAllList():void {
    //     for (const memento of this.mementos){
    //         this.originator.restore(memento);
    //         this.originator.addTopPlayer({username:"custom", score: 20});
    //         this.backup();
    //     }
    // }
}