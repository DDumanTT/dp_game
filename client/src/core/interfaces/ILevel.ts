import { Loader, LoaderResource } from "pixi.js";
import type { Dict } from "@pixi/utils";

export default interface ILevel {
  loadAssets(loader: Loader): void;
  loadSprites(loader: Loader, resources: Dict<LoaderResource>): void;
}
