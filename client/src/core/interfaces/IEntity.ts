import { Graphics } from "pixi.js";
import Position from "../../components/Position";
import IGameManager from "./IGameManager";
import IObserver from "./IObserver";

export default interface IEntity extends IObserver<number> {
  set size(value: number);
  get gameManager(): IGameManager;
  get name(): string;
  get targetPosition(): Position;
  get id(): string;
  get graphics(): Graphics;
  get size(): number;
  destroy(): void;
  move(x: number, y: number, size: number): void;
  update(delta: number): void;
}
