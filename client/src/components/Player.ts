import { Graphics } from "pixi.js";
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

  constructor(id: string, spawnPosition: Position, graphics: Graphics) {
    this._id = id;
    this._spawnPosition = spawnPosition;
    this._graphics = graphics;
  }

  public move(x: number, y: number) {
    this._graphics.position.x += x;
    this._graphics.position.y += y;
  }
}
