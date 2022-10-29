import IGameLoop from "../interfaces/IGameLoop";
import IGameManager from "../interfaces/IGameManager";
import Observable from "../observables/Observable";

export default abstract class GameLoopBase
  extends Observable<number>
  implements IGameLoop
{
  protected gameManager: IGameManager;

  protected get app() {
    return this.gameManager.app;
  }

  constructor(gameManager: IGameManager) {
    super();
    this.gameManager = gameManager;
  }

  public abstract start(): void;
}
