import SocketPickup from "@shared/contracts/SocketPickup";
import IEnumerable from "../interfaces/IEnumerable";
import IEnumerator from "../interfaces/IEnumerator";
import PickupEnumerator from "./PickupEnumerator";

export default class PlayerList implements IEnumerable<SocketPickup> {
    private _items: SocketPickup[] = [];

    public add(item: SocketPickup) {
        this._items.push(item);
    }

    getEnumerator(): IEnumerator<SocketPickup> {
        return new PickupEnumerator(this._items);
    }
}