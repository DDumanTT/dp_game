import config from "@shared/config";
import SocketPlayer from "@shared/contracts/SocketPlayer";
import { Container, Graphics, Text } from "pixi.js";
import IEntity from "../core/interfaces/IEntity";
import IGameManager from "../core/interfaces/IGameManager";
import IMovementStrategy from "../core/interfaces/IMovementStrategy";
import InvertedMovementStrategy from "../core/strategies/InvertedMovementStrategy";
import RegularMovementStrategy from "../core/strategies/RegularMovementStrategy";
import SocketCommunicator from "../services/communicators/SocketCommunicator";
import EntityService from "../services/EntityService";
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

  protected _size: number;
  public get size(): number {
    return this._size;
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

  protected _movementStrategy: IMovementStrategy;
  public setMovementStrategy(strategy: IMovementStrategy) {
    this._movementStrategy = strategy;
  }

  protected _originPosition: Position;
  protected _targetPosition: Position;
  public get targetPosition() {
    return this._targetPosition;
  }
  constructor(
    id: string,
    name: string,
    spawnPosition: Position,
    gameManager: IGameManager,
    graphics?: Graphics
  ) {
    this._id = id;
    this._name = name;
    this._size = 50;
    this._spawnPosition = spawnPosition;
    this._originPosition = new Position(spawnPosition.x, spawnPosition.y);
    this._targetPosition = new Position(spawnPosition.x, spawnPosition.y);
    this._gameManager = gameManager;
    this._graphics = graphics ? graphics : this.drawPlayer();
    this._movementStrategy = new RegularMovementStrategy();
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
    obj.beginFill(0xff0000);
    obj.drawCircle(0, 0, this._size);
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

  public move(x: number, y: number): [x: number, y: number] {
    this._msElapsed = 0;
    this._originPosition.set(this._targetPosition.x, this._targetPosition.y);
    // this._graphics.position.x = newX;
    // this._graphics.position.y = newY;
    this._targetPosition.set(x, y);
    const socket = this._gameManager.getService(SocketCommunicator);
    socket.sendPlayerPosition(this);
    return [x, y];
  }
}
