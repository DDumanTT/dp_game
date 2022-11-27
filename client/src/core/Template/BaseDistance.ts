import MainPlayer from "../../components/MainPlayer";
import Position from "../../components/Position";
import IDistanceUser from "../interfaces/IDistanceUser";
import IEntity from "../interfaces/IEntity";

export abstract class BaseDistance {
  protected _mainPlayer: MainPlayer;
  protected _players: Array<IEntity>;
  protected _convertedPlayers: Array<IDistanceUser> = [];

  constructor(mainPlayer: MainPlayer, players: Array<IEntity>) {
    this._mainPlayer = mainPlayer;
    this._players = players;
  }

  // private calculateDistance(pos: Position):number{
  private calculateDistance(mppos: Position, pos: Position):number{
    return Math.sqrt((Math.pow(pos.x - mppos.x, 2) + Math.pow(pos.y- mppos.y, 2)));
  }

  public templateMethod() {
    this.ExtractRequiredData();
    console.log(this._convertedPlayers);
    // Replaceable method
    this.Sort();
  }

  protected ExtractRequiredData() {
    // converts required data from players
    this._convertedPlayers = this._players.map(x => {
      return {
        username: x.name,
        distance: Math.floor(this.calculateDistance(this._mainPlayer.targetPosition ,x.targetPosition))
      } as IDistanceUser
    });

    this._convertedPlayers = this._convertedPlayers.filter(x => x.username !== this._mainPlayer.name) || [];
  }

  protected abstract Sort():void;

  public GetConvertedPlayers(){
    return this._convertedPlayers;
  }
}
