import IDistanceUser from "../interfaces/IDistanceUser";
import { BaseDistance } from "./BaseDistance";

export class DescendingSortedDistances extends BaseDistance{
    protected Sort(): void {
        // access base converted users
        if(this._convertedPlayers !== undefined && this._convertedPlayers.length > 1){
            this._convertedPlayers.sort((a: IDistanceUser, b: IDistanceUser) =>a.distance-  b.distance);
        }
    }
}