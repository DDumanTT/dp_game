import ILevel from "../core/interfaces/ILevel";
import ILevelPicker from "../core/interfaces/ILevelPicker";
import IAutoService from "../core/interfaces/IAutoService";
import FirstLevel from "../levels/FirstLevel";
import { Application } from "pixi.js";
import Position from "@shared/contracts/SocketPosition";
import config from "@shared/config";
import IGameManager from "../core/interfaces/IGameManager";

export default class LevelPickerService implements ILevelPicker, IAutoService {
  private _gameManager: IGameManager = null!;
  public get gameManager() {
    return this._gameManager;
  }
  private _level: ILevel;
  public get level() {
    return this._level;
  }
  setLevel(level: ILevel): void {
    this._level = level;
  }

  public constructor() {
    this._level = new FirstLevel();
  }

  loadLevel(setupUpdate: () => void, app: Application) {
    this._level.load(setupUpdate, app);
  }

  private keepWithinBounds(position: Position, app: Application) {
    const levelPos = this._level.container.position;
    // console.log(levelPos.x);
    // if (position.x < app.screen.width / 2) {
    //   levelPos.x = 0;
    // }

    // if (position.y < app.screen.height / 2) {
    //   levelPos.y = 0;
    // }

    levelPos.x = -position.x + app.screen.width / 2;
    if (levelPos.x > 0) {
      levelPos.x = 0;
    } else if (levelPos.x < -(config.world.width - app.screen.width)) {
      levelPos.x = -(config.world.width - app.screen.width);
    }

    levelPos.y = -position.y + app.screen.height / 2;
    if (levelPos.y > 0) {
      levelPos.y = 0;
    } else if (levelPos.y < -(config.world.height - app.screen.height)) {
      levelPos.y = -(config.world.height - app.screen.height);
    }
  }

  follow(position: Position, app: Application) {
    this._level.container.pivot.set(position.x, position.y);

    this._level.container.position.set(
      app.screen.width / 2,
      app.screen.height / 2
    );
  }

  execute(gameManager: IGameManager): void {
    this._gameManager = gameManager;
  }
}
