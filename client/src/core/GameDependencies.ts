import { Application } from "pixi.js";
import IAutoService from "./interfaces/IAutoService";

export default class GameDependencies {
  private _app: Application;
  public get app(): Application {
    return this._app;
  }
  protected set app(value: Application) {
    this._app = value;
  }
  protected services: IAutoService[] = [];

  constructor(app: Application, services: IAutoService[]) {
    this._app = app;
    this.services = services;
  }
}
