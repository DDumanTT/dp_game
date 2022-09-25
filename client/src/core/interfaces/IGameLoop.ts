import { Loader, LoaderResource } from "pixi.js";
import type { Dict } from "@pixi/utils";

export default interface GameLoop {
  loadAssets(loader: Loader): void;
  loadSprites(loader: Loader, resources: Dict<LoaderResource>): void;
  start(): void;
  update(delta: number): void;
}
