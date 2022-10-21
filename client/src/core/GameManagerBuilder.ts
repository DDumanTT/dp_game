import { Application } from "pixi.js";
import GameDependencies from "./GameDependencies";
import GameManager from "./GameManager";
import IGameManagerBuilder from "./interfaces/IGameManagerBuilder";
import IAutoService from "./interfaces/IAutoService";
import IGameManager from "./interfaces/IGameManager";

export default class GameManagerBuilder
  extends GameDependencies
  implements IGameManagerBuilder
{
  private _gameManager: IGameManager;

  constructor(app: Application) {
    const services: IAutoService[] = [];

    super(app, services);
    this._gameManager = new GameManager(app, services);
  }

  public addAutoService(service: IAutoService) {
    this.services.push(service);
  }

  public build(): IGameManager {
    for (const service of this.services) {
      service.execute(this._gameManager);
    }

    return this._gameManager;
  }
}
