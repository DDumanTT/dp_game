import BasePickup from "../base/BasePickup";
import IBridge from '../interfaces/IBridge';
import IPickup from "../interfaces/IPickup";
import MainPlayer from './../../components/MainPlayer';

export default class PickUpBridge implements IBridge {
    private _pickup: IPickup;

    constructor(pickup: IPickup){
        this._pickup = pickup;
    }

    activate(player: MainPlayer): void {
        this._pickup.activate(player);
    }

    destroy(): void {
        this._pickup.destroy();
    }
}