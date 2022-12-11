import * as PIXI from "pixi.js";
import IGameManager from "../core/interfaces/IGameManager";
import EventHandler from "./EventHandler";

export default class MouseEventHandler extends EventHandler {
  private _position: PIXI.Point | null;

  constructor(gameManager: IGameManager) {
    super();

    this._position = null;

    gameManager.app.renderer.plugins.interaction.on(
      "mousemove",
      (e: PIXI.InteractionEvent) => {
        this._position = e.data.global;
      }
    );
  }

  public handle(request: string): PIXI.Point | string | null {
    if (request === "mouse") {
      return this._position;
    }
    return super.handle(request);
  }
}
