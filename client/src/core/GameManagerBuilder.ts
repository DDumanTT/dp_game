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
    const autoServices: IAutoService[] = [];
    const services: any[] = [];

    super(app, autoServices, services);
    this._gameManager = new GameManager(app, autoServices, services);
  }

  public addAutoService(service: IAutoService) {
    this.autoServices.push(service);
  }

  public addService<T>(service: new (mng: IGameManager) => T) {
    this.services.push(new service(this._gameManager));
  }

  public build(): IGameManager {
    for (const service of this.autoServices) {
      service.execute(this._gameManager);
    }

    return this._gameManager;
  }
}
