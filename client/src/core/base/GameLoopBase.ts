import { Loader, LoaderResource, Sprite } from "pixi.js";
import type { Dict } from "@pixi/utils";

import IGameLoop from "../interfaces/IGameLoop";
import IGameManager from "../interfaces/IGameManager";

export default abstract class GameLoopBase implements IGameLoop {
  protected gameManager: IGameManager;

  protected get app() {
    return this.gameManager.app;
  }

  constructor(gameManager: IGameManager) {
    this.gameManager = gameManager;

    this.loadAssets(gameManager.app.loader);
    gameManager.app.loader.load(this.loadSprites.bind(this));
    gameManager.app.loader.onComplete.add(this.start.bind(this));
    gameManager.app.loader.onComplete.add(this.setupUpdate.bind(this));
  }

  public loadAssets(loader: Loader) {}
  public loadSprites(loader: Loader, resources: Dict<LoaderResource>) {}
  public abstract start(): void;
  public abstract update(delta: number): void;

  private setupUpdate() {
    this.gameManager.app.ticker.add((delta) => {
      this.update(delta);
    });
  }
}
