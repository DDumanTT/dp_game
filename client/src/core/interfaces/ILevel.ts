import { Dict } from "@pixi/utils";
import { Application, Container, Loader, LoaderResource } from "pixi.js";

export default interface ILevel {
  container: Container;
  load(app: Application): void;
  addToContainer(): void;
  loadAssets(): void;
  loadSprites(loader: Loader, resources: Dict<LoaderResource>): void;
}
