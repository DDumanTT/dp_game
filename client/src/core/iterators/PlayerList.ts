import SocketPickup from "@shared/contracts/SocketPickup";
import SocketPlayer from "@shared/contracts/SocketPlayer";
import IEntity from "../interfaces/IEntity";
import IEnumerable from "../interfaces/IEnumerable";
import IEnumerator from "../interfaces/IEnumerator";
import PlayerEnumerator from "./PlayerEnumerator";

export default class PlayerList implements IEnumerable<SocketPickup> {
    private _items: SocketPickup[] = [];

    public add(item: SocketPickup) {
        this._items.push(item);
    }

    getEnumerator(): IEnumerator<SocketPickup> {
        return new PlayerEnumerator(this._items);
    }
}