import IGameLoop from "../interfaces/IGameLoop";
import IGameManager from "../interfaces/IGameManager";

export default abstract class GameLoopBase implements IGameLoop {
  protected gameManager: IGameManager;

  protected get app() {
    return this.gameManager.app;
  }

  constructor(gameManager: IGameManager) {
    this.gameManager = gameManager;
  }

  public abstract start(): void;
  public abstract update(delta: number): void;

  protected setupUpdate() {
    this.gameManager.app.ticker.add((delta) => {
      this.update(delta);
    });
  }
}
