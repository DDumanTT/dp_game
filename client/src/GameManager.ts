import {
  Application,
  Loader,
  LoaderResource,
  TilingSprite,
  Sprite,
  Container,
  Graphics,
} from "pixi.js";

import type { Dict } from "@pixi/utils";

import groundImage from "./assets/textures/ground.jpg";
import Player from "./components/Player";
import GameManagerBuilder from "./core/GameManagerBuilder";
import SocketCommunicator from "./services/communicators/SocketCommunicator";
import SocketPlayer from "@shared/contracts/SocketPlayer";

export interface CachedSprites {
  ground: Sprite
  background: Sprite
}

export default class GameManager {
// TODO: fix
  private _gameInstance: GameManagerBuilder;
  private _sprites = {} as CachedSprites;

  constructor(gameInstance: GameManagerBuilder) {
    this._gameInstance = gameInstance;
  }

  public loadAssets(loader: Loader) {
    loader.add("ground", groundImage);
  }

  // TODO: extract to auto service
  public loadSprites(loader: Loader, resources: Dict<LoaderResource>) {
    this._sprites.background = new TilingSprite(
      resources["ground"].texture!,
      5000,
      5000
    );
  }

  public gameStart() {
    const app = this._gameInstance.app;

    const level = new Container();
    level.addChild(this._sprites.background);

    app.stage.addChild(level);

    app.view.addEventListener("mousemove", (e: MouseEvent) => {
      // console.log(`x: ${e.clientX}, y: ${e.clientY}`);
    });

    let pixi_players: Player[] = [];

    let elapsed = 0.0;
    let seconds = 0;
    app.ticker.add((delta) => {
      elapsed += delta;
      seconds += (1 / 60) * delta;

      if (seconds >= 0.5) {
        seconds = 0;

        const connectedPlayers: Player[] = [];

        const socket_players = this._gameInstance.getService(SocketCommunicator)?.players;
        console.log(socket_players)
        // TODO: improve speed
        for (const pixi_player of pixi_players) {
          const isPlayerDisconnected =
            socket_players.filter((x) => x.id == pixi_player.id).length == 0;

          if (isPlayerDisconnected) {
            pixi_player.graphics.clear();
            // pixi_player.graphics.destroy();
          }
        }

        for (const socket_player of socket_players) {
          const isPlayerDrawn =
            pixi_players.filter((x) => x.id == socket_player.id).length > 0;

          if (!isPlayerDrawn) {
            const graphics = drawPlayer(level, socket_player);
            const player = new Player(socket_player.id, graphics);
            pixi_players.push(player);
          }
        }
      }
    });

    function drawPlayer(container: Container, player: SocketPlayer) {
      const obj = new Graphics();
      obj.beginFill(0xff0000);
      obj.drawCircle(player.position.x, player.position.y, 50);
      container.addChild(obj);
      return obj;
    }
  }
}
