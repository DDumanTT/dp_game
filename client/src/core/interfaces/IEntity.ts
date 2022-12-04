import { Graphics } from "pixi.js";
import Position from "../../components/Position";
import IGameManager from "./IGameManager";

export default interface IEntity {
  get size(): number;
  set size(value: number);
  get color(): number;
  set color(value: number);
  get gameManager(): IGameManager;
  get name(): string;
  get targetPosition(): Position;
  get id(): string;
  get graphics(): Graphics;
  destroy(): void;
  move(x: number, y: number, size: number): void;
  update(delta: number): void;
}
