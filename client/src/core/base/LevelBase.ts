import { Dict } from "@pixi/utils";
import {
  Application,
  Container,
  DisplayObject,
  Loader,
  LoaderResource,
  Sprite,
} from "pixi.js";
import ILevel from "../interfaces/ILevel";

export default abstract class LevelBase implements ILevel {
  protected readonly spriteCache: Record<string, Sprite> = {};

  protected readonly _container = new Container();
  public get container(): Container {
    return this._container;
  }

  protected loader: Loader;

  constructor() {
    this.loader = new Loader();
    this._container.sortableChildren = true;
  }

  public load(setupUpdate: () => void, app: Application) {
    this.loadAssets();
    this.loader.load(this.loadSprites.bind(this));
    this.loader.onComplete.add(() => app.stage.addChild(this.container), this);
    this.loader.onComplete.add(this.addToContainer, this);
    this.loader.onComplete.add(setupUpdate);
  }

  public abstract addToContainer(): void;

  public abstract loadAssets(): void;

  public abstract loadSprites(
    loader: Loader,
    resources: Dict<LoaderResource>
  ): void;
}
