import MainPlayer from "../../components/MainPlayer";
import IDistanceUser from "../interfaces/IDistanceUser";
import IEntity from "../interfaces/IEntity";
import { BaseDistance } from "./BaseDistance";


export class AscendingSortedDistances extends BaseDistance{
    constructor(mainPlayer: MainPlayer, players: Array<IEntity>){
        super(mainPlayer, players)
    }

    protected Sort(): void {
        if(this._convertedPlayers !== undefined && this._convertedPlayers.length > 1){
            console.log("Sorting..")
            this._convertedPlayers.sort((a: IDistanceUser, b: IDistanceUser) => b.distance - a.distance);
        }
    }
}