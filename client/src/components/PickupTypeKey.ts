import PickupType from "@shared/constants/PickupType";
import { ILineStyleOptions } from "pixi.js";

export default class PickupTypeKey{

    private _type: PickupType;

    get type(): PickupType {
      return this._type;
    }

    constructor(type: PickupType) {
        this._type = type;

      }

}