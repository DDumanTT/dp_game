import { Graphics } from "pixi.js";

export default interface IEntity {
  get id(): string;
  get graphics(): Graphics;
  get size(): number;
  destroy(): void;
  move(x: number, y: number, size: number): void;
  update(delta: number): void;
}
