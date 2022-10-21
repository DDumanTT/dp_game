import { Graphics } from "pixi.js";

export default interface IEntity {
  get id(): string;
  get graphics(): Graphics;
  destroy(): void;
  move(x: number, y: number): [x: number, y: number];
  update(delta: number): void;
}
