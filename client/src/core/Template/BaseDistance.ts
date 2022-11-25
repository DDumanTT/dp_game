import MainPlayer from "../../components/MainPlayer";
import IEntity from "../interfaces/IEntity";

export abstract class BaseDistance {

  constructor(mainPlayer: MainPlayer, players: Array<IEntity>) {}

  public templateMethod() {
    this.LoadPlayers();
    this.Sort();
  }

  protected LoadPlayers() {
    //
  }

  protected abstract Sort():void;
}
