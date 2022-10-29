import { Graphics } from "pixi.js";
import Player from "../../components/Player";
import Position from "../../components/Position";
import LevelPickerService from "../../services/LevelPickerService";
import IGameManager from "../interfaces/IGameManager";
import IPickup from "../interfaces/IPickup";

export default abstract class BasePickup implements IPickup {
  private _id: number;
  public get id() {
    return this._id;
  }

  private _position: Position;
  public get position() {
    return this._position;
  }

  private _graphics: Graphics;
  public get graphics() {
    return this._graphics;
  }

  private _gameManager: IGameManager;
  public get gameManager() {
    return this._gameManager;
  }

  constructor(
    id: number,
    position: Position,
    graphics: Graphics,
    gameManager: IGameManager
  ) {
    this._id = id;
    this._position = position;
    this._graphics = graphics;
    this._gameManager = gameManager;

    const levelPicker = gameManager.getService(LevelPickerService);
    levelPicker.level.container.addChild(graphics);
  }

  public destroy(): void {
    this._id = -1;
    if (!this._graphics.destroyed) {
      this._graphics.destroy();
    }
  }

  abstract activate(player: Player): void;
}
