/* eslint-disable @typescript-eslint/no-empty-function */
import { Graphics } from "pixi.js";

import IEntity from "../interfaces/IEntity";
import IGameManager from "../interfaces/IGameManager";
import Position from "../../components/Position";
import IComposite from "./IComposite";
import MainPlayer from "../../components/MainPlayer";

export const BlobGraphics = (color: number, size: number) => {
  const obj = new Graphics();
  obj.beginFill(color);
  obj.drawCircle(0, 0, 100);
  obj.width = size;
  obj.height = size;
  obj.zIndex = 9;
  return obj;
};

export default class MassBlob implements IComposite {
  private _speed = 5;
  private _parent: IEntity;
  private _direction: number;

  constructor(
    parent: IEntity,
    id: string,
    graphics: Graphics,
    direction: number,
    speed: number
  ) {
    this._parent = parent;
    this._id = id;
    this._graphics = graphics;
    this._direction = direction;
    this._speed = speed;

    setTimeout(() => this.destroy(), 10000);
  }

  public add(child: IComposite) {}

  public remove(child: IComposite) {}

  public action(delta: number) {
    this.update(delta);
  }

  private _size = 5;
  get size() {
    return this._size;
  }
  set size(value: number) {
    this._size = value;
  }

  get color() {
    return this._parent.color;
  }
  set color(value: number) {
    this._parent.color = value;
  }

  get gameManager() {
    return this._parent.gameManager;
  }

  get name() {
    return this._parent.name;
  }

  private _id: string;
  get id() {
    return this._id;
  }

  private _graphics: Graphics;
  get graphics() {
    return this._graphics;
  }

  public destroy() {
    this._graphics.destroy();
    (this._parent as MainPlayer).remove(this);
  }

  get targetPosition() {
    return this._parent.targetPosition;
  }

  public move(x: number, y: number) {
    this._graphics.x += x;
    this._graphics.y += y;
  }

  public update(delta: number) {
    const distance = delta * this._speed;

    const x = distance * Math.cos(this._direction);
    const y = distance * Math.sin(this._direction);

    this.move(x, y);
    if (this._speed > 0) this._speed -= 0.01;
  }
}
