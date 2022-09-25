import { Graphics } from "pixi.js";

export default class Player {
  private _id: string;
  public get id(): string {
    return this._id;
  }

  private _graphics: Graphics;
  public get graphics(): Graphics {
    return this._graphics;
  }

  constructor(id: string, graphics: Graphics) {
    this._id = id;
    this._graphics = graphics;
  }

  public setPosition(x: number, y: number) {
    this._graphics.position.x = x;
    this._graphics.position.y = y;
  }
}
