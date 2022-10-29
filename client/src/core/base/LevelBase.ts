import { Dict } from "@pixi/utils";
import {
  Application,
  Container,
  DisplayObject,
  Loader,
  LoaderResource,
  Sprite,
} from "pixi.js";
import { IPickupFactory } from "../Factories/AbstractFactory";
import Game from "../Game";
import IGameManager from "../interfaces/IGameManager";
import ILevel from "../interfaces/ILevel";

export default abstract class LevelBase implements ILevel {
  private readonly _gameManager: IGameManager;

  protected readonly spriteCache: Record<string, Sprite> = {};
  protected readonly _container = new Container();
  public get container(): Container {
    return this._container;
  }

  protected _pickupFactory: IPickupFactory;

  protected loader: Loader;

  constructor(gameManager: IGameManager, pickupFactory: IPickupFactory) {
    this.loader = new Loader();
    this._container.sortableChildren = true;
    this._pickupFactory = pickupFactory;
    this._gameManager = gameManager;

    // this._container.pivot.set(1000, 1000);
    // this._container.position.set(1000, 1000);
  }

  public load(app: Application) {
    this.loadAssets();
    this.loader.load(this.loadSprites.bind(this));
    this.loader.onComplete.add(() => app.stage.addChild(this.container), this);
    this.loader.onComplete.add(this.addToContainer, this);
    // this.loader.onLoad.add(() => {
    //   console.log(11);

    //   const game = this._gameManager.getService(Game);
    //   this._gameManager.app.ticker.add((delta: number) => {
    //     game.notifyObservers(delta);
    //   });
    // });
  }

  public abstract addToContainer(): void;

  public abstract loadAssets(): void;

  public abstract loadSprites(
    loader: Loader,
    resources: Dict<LoaderResource>
  ): void;
}
