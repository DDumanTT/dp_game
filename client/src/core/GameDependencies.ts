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
  protected autoServices: IAutoService[] = [];
  protected services: any[] = [];

  constructor(app: Application, autoServices: IAutoService[], services: any[]) {
    this._app = app;
    this.autoServices = autoServices;
    this.services = services;
  }
}
