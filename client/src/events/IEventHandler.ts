import * as PIXI from "pixi.js";

export default interface IEventHandler {
  setNextHandler(handler: IEventHandler): IEventHandler;
  handle(event: string, ...params: unknown[]): string | null | PIXI.Point;
}
