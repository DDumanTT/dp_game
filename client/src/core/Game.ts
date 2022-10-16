import { Loader } from "pixi.js";
import GameLoopBase from "./base/GameLoopBase";
import IGameManager from "./interfaces/IGameManager";
import ILevel from "./interfaces/ILevel";

export default class Game extends GameLoopBase {
  private _level: ILevel;

  constructor(gameManager: IGameManager, level: ILevel) {
    super(gameManager);
    this._level = level;
  }

  public loadAssets(loader: Loader): void {
    this._level.loadAssets(loader);
  }

  public start(): void {
    throw new Error("Method not implemented.");
  }
  public update(delta: number): void {
    throw new Error("Method not implemented.");
  }
}
