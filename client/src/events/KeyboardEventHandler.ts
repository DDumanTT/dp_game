import * as PIXI from "pixi.js";
import IGameManager from "../core/interfaces/IGameManager";
import EntityService from "../services/EntityService";
import EventHandler from "./EventHandler";

export default class KeyboardEventHandler extends EventHandler {
  private _position: PIXI.Point | null;

  constructor(gameManager: IGameManager) {
    super();

    this._position = null;

    const entityService = gameManager.getService(EntityService);

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      this._position = null;
      const playerPos = entityService.mainPlayer?.graphics.position;
      const newPos = playerPos?.clone();
      if (!newPos) return;
      switch (e.key) {
        case "ArrowUp":
          newPos.y - 100;
          break;
        case "ArrowDown":
          newPos.y + 100;
          break;
        case "ArrowRight":
          newPos.x + 100;
          break;
        case "ArrowLeft":
          newPos.x - 100;
          break;
        default:
          return;
      }
      this._position = newPos;
    });
  }

  public handle(request: string): PIXI.Point | string | null {
    if (request === "keyboard") {
      return this._position;
    }
    return super.handle(request);
  }
}
