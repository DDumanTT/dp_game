import { Dict } from "@pixi/utils";
import { Loader, LoaderResource, TilingSprite } from "pixi.js";

import groundImage from "../assets/textures/ground.jpg";
import config from "@shared/config";
import LevelBase from "../core/base/LevelBase";

export default class FirstLevel extends LevelBase {
  loadAssets(): void {
    this.loader.add(groundImage);
  }

  loadSprites(loader: Loader, resources: Dict<LoaderResource>): void {
    this.spriteCache[groundImage] = new TilingSprite(
      resources[groundImage].texture!,
      config.world.width,
      config.world.height
    );
    this.spriteCache[groundImage].zIndex = -1;
  }

  addToContainer(): void {
    this.container.addChild(this.spriteCache[groundImage]);
  }
}
