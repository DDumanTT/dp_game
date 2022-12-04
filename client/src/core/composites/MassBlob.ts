import { Graphics } from "pixi.js";

import IEntity from "../interfaces/IEntity";
import IGameManager from "../interfaces/IGameManager";
import Position from "../../components/Position";

export default class MassBlob implements IEntity, IComposite {
  private _speed: number = 5;
  private _parent: IEntity;

  constructor(parent: IEntity, id: string, graphics: Graphics) {
    this._parent = parent;
    this._id = id;
    this._graphics = new Graphics;
  }

  public add(child: IComposite) {}

  public remove(child: IComposite) {}

  public action(delta: number) {

  }

  private _size: number = 5;
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
  }

  get targetPosition() {
    return this._parent.targetPosition;
  }

  public move(x: number, y: number) {
    this._graphics.x = x;
    this._graphics.y = y; 
  }

  public update(delta: number) {
    console.log('first')
  }

}