import { Graphics } from "pixi.js";
import IMovementStrategy from "../core/interfaces/IMovementStrategy";
import InvertedMovementStrategy from "../core/strategies/InvertedMovementStrategy";
import RegularMovementStrategy from "../core/strategies/RegularMovementStrategy";
import Position from "./Position";

export default class Player {
  private _id: string;
  public get id(): string {
    return this._id;
  }

  private _spawnPosition: Position;
  public get spawnPosition(): Position {
    return this._spawnPosition;
  }
  private _graphics: Graphics;
  public get graphics(): Graphics {
    return this._graphics;
  }

  private _movementStrategy: IMovementStrategy;
  public setMovementStrategy(strategy: IMovementStrategy) {
    this._movementStrategy = strategy;
  }

  constructor(id: string, spawnPosition: Position, graphics: Graphics) {
    this._id = id;
    this._spawnPosition = spawnPosition;
    this._graphics = graphics;
    this._movementStrategy = new InvertedMovementStrategy();
  }

  public move(x: number, y: number): [number, number] {
    const [newX, newY] = this._movementStrategy.move(
      this._graphics.position.x,
      this._graphics.position.y,
      x,
      y
    );
    this._graphics.position.x = newX;
    this._graphics.position.y = newY;
    return [newX, newY];
  }
}
