import { Dict } from "@pixi/utils";
import { Loader, LoaderResource, Sprite, TilingSprite } from "pixi.js";
import ILevel from "../core/interfaces/ILevel";

import groundImage from "../assets/textures/ground.jpg";
import config from "@shared/config";

export default class FirstLevel implements ILevel {
  private readonly _spriteCache: Record<string, Sprite> = {};
  loadAssets(loader: Loader): void {
    loader.add(groundImage);
  }
  loadSprites(loader: Loader, resources: Dict<LoaderResource>): void {
    this._spriteCache[groundImage] = new TilingSprite(
      resources[groundImage].texture!,
      config.world.width,
      config.world.height
    );
  }
}
