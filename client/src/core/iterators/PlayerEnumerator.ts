import IEnumerator from "../interfaces/IEnumerator";
import IEntitty from "../interfaces/IEntity";
import SocketPlayer from "@shared/contracts/SocketPlayer";
import SocketPickup from "@shared/contracts/SocketPickup";

export default class PlayerEnumerator implements IEnumerator<SocketPickup> {
    private _players: SocketPickup[];
    private _position = 0;

    public current?: SocketPickup = undefined;

    constructor(players: SocketPickup[]) {
        this._players = players;
    }
    
    public moveNext(): boolean {
        const containsElements = this._position >= this._players.length;

        if (containsElements) {
            this.current = this._players[this._position];
            this._position++;
        }

        return containsElements;
    }
}