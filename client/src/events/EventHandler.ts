import * as PIXI from "pixi.js";
import IEventHandler from "./IEventHandler";

export default abstract class EventHandler implements IEventHandler {
  protected nextHandler: IEventHandler | null;

  constructor() {
    this.nextHandler = null;
  }

  setNextHandler(handler: IEventHandler): IEventHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(event: string): string | null | PIXI.Point {
    if (this.nextHandler) {
      return this.nextHandler.handle(event);
    }
    return null;
  }
}
