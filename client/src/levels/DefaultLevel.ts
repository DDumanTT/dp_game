import {
  Container,
  Graphics,
  Loader,
  LoaderResource,
  Sprite,
  TilingSprite,
} from "pixi.js";
import type { Dict } from "@pixi/utils";

import GameLoopBase from "../core/base/GameLoopBase";

import groundImage from "../assets/textures/ground.jpg";
import Player from "../components/Player";
import SocketCommunicator from "../services/communicators/SocketCommunicator";
import SocketPlayer from "@shared/contracts/SocketPlayer";

export default class DefaultLevel extends GameLoopBase {
  private _spriteCache: Record<string, Sprite> = {};
  // TODO: into observable or event
  private _pixiPlayers: Player[] = [];

  private _level = new Container();

  public override loadAssets(loader: Loader) {
    loader.add(groundImage);
  }

  public override loadSprites(loader: Loader, resources: Dict<LoaderResource>) {
    this._spriteCache[groundImage] = new TilingSprite(
      resources[groundImage].texture!,
      5000,
      5000
    );
  }

  public start(): void {
    this._level.addChild(this._spriteCache[groundImage]);
    this.app.stage.addChild(this._level);

    this.app.view.addEventListener("mousemove", (e: MouseEvent) => {
      // console.log(`x: ${e.clientX}, y: ${e.clientY}`);
    });
  }

  private _seconds: number = 0;
  public update(delta: number): void {
    this._seconds += (1 / 60) * delta;

    if (this._seconds >= 0.5) {
      this._seconds = 0;

      const socket_players =
        this.gameManager.getService(SocketCommunicator)?.players;

        console.log(socket_players);

      // TODO: improve speed and extract to service
      for (const pixi_player of this._pixiPlayers) {
        const isPlayerDisconnected =
          socket_players?.filter((x) => x.id == pixi_player.id).length == 0 ?? true;

        if (isPlayerDisconnected) {
          pixi_player.graphics.clear();
        }
      }

      for (const socket_player of socket_players ?? []) {
        const isPlayerDrawn =
          this._pixiPlayers.filter((x) => x.id == socket_player.id).length > 0;

        if (!isPlayerDrawn) {
          const graphics = this.drawPlayer(this._level, socket_player);
          const player = new Player(socket_player.id, graphics);
          this._pixiPlayers.push(player);
        }
      }
    }
  }

// TODO: extract to factory
  public drawPlayer(container: Container, player: SocketPlayer) {
    const obj = new Graphics();
    obj.beginFill(0xff0000);
    obj.drawCircle(player.position.x, player.position.y, 50);
    container.addChild(obj);
    return obj;
  }
}
