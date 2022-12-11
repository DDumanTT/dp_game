import IAutoService from "../core/interfaces/IAutoService";
import IGameManager from "../core/interfaces/IGameManager";
import MouseEventHandler from "../events/MouseEventHandler";
import TapEventHandler from "../events/TapEventHandler";
import KeyboardEventHandler from "../events/KeyboardEventHandler";
import IEventHandler from "../events/IEventHandler";
import EntityService from "./EntityService";

export default class EventService implements IAutoService {
  private _gameManager: IGameManager = null!;
  private _handler: IEventHandler = null!;

  public get gameManager() {
    return this._gameManager;
  }

  private setupChain() {
    const mouseHandler = new MouseEventHandler(this._gameManager);
    const tapHandler = new TapEventHandler(this._gameManager);
    const keyboardHandler = new KeyboardEventHandler(this._gameManager);

    mouseHandler.setNextHandler(tapHandler).setNextHandler(keyboardHandler);

    this._handler = mouseHandler;
  }

  public handle(event: string) {
    return this._handler.handle(event);
  }

  execute(gameManager: IGameManager): void {
    this._gameManager = gameManager;
    this.setupChain();
  }
}
