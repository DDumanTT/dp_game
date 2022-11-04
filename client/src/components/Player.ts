import config from "@shared/config";
import { Graphics, Text } from "pixi.js";
import MoveCommand from "../core/commands/MoveCommand";
import ICommand from "../core/interfaces/ICommand";
import IEntity from "../core/interfaces/IEntity";
import IGameManager from "../core/interfaces/IGameManager";
import LevelPickerService from "../services/LevelPickerService";
import Position from "./Position";

export default class Player implements IEntity {
  protected _id: string;
  public get id(): string {
    return this._id;
  }

  protected _name: string;
  public get name(): string {
    return this._name;
  }

  protected _color: number;
  public get color(): number {
    return this._color;
  }

  public set color(value: number) {
    this._color = value;
  }

  protected _size: number;
  public get size(): number {
    return this._size;
  }

  public set size(value: number) {
    const val = value.clamp(
      0,
      Math.min(config.world.height / 2, config.world.width / 2)
    );
    this._graphics.width = val * 2;
    this._graphics.height = val * 2;
    this._size = val;
  }

  protected _spawnPosition: Position;
  public get spawnPosition(): Position {
    return this._spawnPosition;
  }
  protected _graphics: Graphics;
  public get graphics(): Graphics {
    return this._graphics;
  }

  protected _gameManager: IGameManager;
  public get gameManager(): IGameManager {
    return this._gameManager;
  }

  protected _originPosition: Position;
  public get originPosition() {
    return this._originPosition;
  }
  protected _targetPosition: Position;
  public get targetPosition() {
    return this._targetPosition;
  }

  private moveCommand: ICommand = new MoveCommand(this);

  constructor(
    id: string,
    name: string,
    color: number,
    spawnPosition: Position,
    size: number,
    gameManager: IGameManager,
    graphics?: Graphics
  ) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._size = size;
    this._spawnPosition = spawnPosition;
    this._originPosition = new Position(spawnPosition.x, spawnPosition.y);
    this._targetPosition = new Position(spawnPosition.x, spawnPosition.y);
    this._gameManager = gameManager;
    this._graphics = graphics ? graphics : this.drawPlayer();
  }

  private lerp = (p0: number, p1: number, t: number) => (1 - t) * p0 + t * p1;

  protected interpolate(time: number) {
    this._graphics.position.x = this.lerp(
      this._originPosition.x,
      this._targetPosition.x,
      time
    );
    this._graphics.position.y = this.lerp(
      this._originPosition.y,
      this._targetPosition.y,
      time
    );
  }

  private _msElapsed = 0;

  update(delta: number): void {
    this._msElapsed += this._gameManager.app.ticker.elapsedMS;
    this.interpolate(
      (this._msElapsed / config.performance.refreshTime).clamp(0, 1)
    );
  }

  protected drawPlayer() {
    const levelPicker = this._gameManager.getService(LevelPickerService);
    const obj = new Graphics();
    // const color = Math.floor(Math.random() * 0xffffff);
    obj.beginFill(this.color);
    obj.drawCircle(0, 0, 50);
    obj.width = this._size * 2;
    obj.height = this._size * 2;
    const text = new Text(this._name, {
      align: "center",
      breakWords: true,
      wordWrap: true,
      fill: "#ffffff",
      strokeThickness: 3,
    });
    text.anchor.set(0.5);
    obj.addChild(text);
    obj.zIndex = 10;
    levelPicker.level.container.addChild(obj);
    obj.position.set(this._spawnPosition.x, this._spawnPosition.y);
    return obj;
  }

  public destroy() {
    this._graphics.destroy();
  }

  public move(x: number, y: number, size: number) {
    // this._msElapsed = 0;
    // this._originPosition.set(this._targetPosition.x, this._targetPosition.y);
    // this._targetPosition.set(x, y);
    // this.size = size;
    this.moveCommand.execute(x, y, size);
  }
}
