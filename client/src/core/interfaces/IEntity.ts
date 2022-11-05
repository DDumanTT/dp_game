import { Graphics } from "pixi.js";
import Position from "../../components/Position";
import IGameManager from "./IGameManager";

export default interface IEntity {
  set size(value: number);
  get gameManager(): IGameManager;
  get name(): string;
  get color(): number;
  set color(value: number);
  get targetPosition(): Position;
  get id(): string;
  get graphics(): Graphics;
  get size(): number;
  destroy(): void;
  move(x: number, y: number, size: number): void;
  update(delta: number): void;
}
