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
import Position from "../components/Position";
import SocketPosition from "@shared/contracts/SocketPosition";

import { Factory } from "../core/Factories/Factory";
import { EntityType } from "../core/interfaces/IEntityFactory";

import RegularMovementStrategy from "../core/strategies/RegularMovementStrategy";
import InvertedMovementStrategy from "../core/strategies/InvertedMovementStrategy";

import config from "../config";

export default class DefaultLevel extends GameLoopBase {
  private readonly _spriteCache: Record<string, Sprite> = {};
  // TODO: into observable or event
  private readonly _pixiPlayers: Player[] = [];
  private _currentPixiPlayer: Player | undefined = undefined;

  private readonly _level = new Container();

  private readonly _mousePosition: Position = new Position(0, 0);

  public override loadAssets(loader: Loader) {
    loader.add(groundImage);
  }

  public override loadSprites(loader: Loader, resources: Dict<LoaderResource>) {
    this._spriteCache[groundImage] = new TilingSprite(
      resources[groundImage].texture!,
      config.world.width,
      config.world.height
    );
  }

  public start(): void {
    this._level.addChild(this._spriteCache[groundImage]);
    this.app.stage.addChild(this._level);

    let flag = true;
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.code === "KeyS") {
        if (flag) {
          this._currentPixiPlayer?.setMovementStrategy(
            new RegularMovementStrategy()
          );
        } else {
          this._currentPixiPlayer?.setMovementStrategy(
            new InvertedMovementStrategy()
          );
        }
        flag = !flag;
      }
    });
  }

  private _seconds: number = 0;
  public update(delta: number): void {
    const socket = this.gameManager.getService(SocketCommunicator);

    if (this._currentPixiPlayer) {
      const playerPosOnScreen =
        this._currentPixiPlayer.graphics.getGlobalPosition();
      const { x: mouseX, y: mouseY } =
        this.app.renderer.plugins.interaction.mouse.global;

      let distance = Math.sqrt(
        (mouseX - playerPosOnScreen.x) ** 2 +
          (mouseY - playerPosOnScreen.y) ** 2
      );
      let angle = Math.atan2(
        mouseY - playerPosOnScreen.y,
        mouseX - playerPosOnScreen.x
      );

      distance = distance.clamp(-250, 250) / 50;

      let x = distance * Math.cos(angle);
      let y = distance * Math.sin(angle);

      this._mousePosition.set(x, y);
    }

    if (socket.currentPlayerId == undefined) {
      return;
      // TODO: connecting message + timeout
    }

    if (socket.players.length < 1 /* 2*/) {
      return;
      // TODO: waiting for players to connect
    }

    this._seconds += (1 / 60) * delta;

    this._seconds = 0;

    if (this._currentPixiPlayer) {
      const [x, y] = this._currentPixiPlayer.move(
        this._mousePosition.x,
        this._mousePosition.y
      );

      // Player world bound collision
      if (this._currentPixiPlayer.graphics.x < 50) {
        this._currentPixiPlayer.graphics.x = 50;
      } else if (this._currentPixiPlayer.graphics.x > config.world.width - 50) {
        this._currentPixiPlayer.graphics.x = config.world.width - 50;
      }

      if (this._currentPixiPlayer.graphics.y < 50) {
        this._currentPixiPlayer.graphics.y = 50;
      } else if (
        this._currentPixiPlayer.graphics.y >
        config.world.height - 50
      ) {
        this._currentPixiPlayer.graphics.y = config.world.height - 50;
      }

      // World bounds detection
      this._level.position.x = -x + this.app.screen.width / 2;
      if (this._level.position.x > 0) {
        this._level.position.x = 0;
      } else if (
        this._level.position.x < -(config.world.width - this.app.screen.width)
      ) {
        this._level.position.x = -(config.world.width - this.app.screen.width);
      }

      this._level.position.y = -y + this.app.screen.height / 2;
      if (this._level.position.y > 0) {
        this._level.position.y = 0;
      } else if (
        this._level.position.y < -(config.world.height - this.app.screen.height)
      ) {
        this._level.position.y = -(
          config.world.height - this.app.screen.height
        );
      }
    }

    // TODO: improve speed and extract to service
    for (const pixi_player of this._pixiPlayers) {
      const isPlayerDisconnected =
        socket?.players?.filter((x) => x.id == pixi_player.id).length == 0 ??
        true;

      if (isPlayerDisconnected) {
        pixi_player.graphics.clear();
        // TODO: delete object to free memory
      }
    }

    for (const socketPlayer of socket?.players ?? []) {
      const isPlayerDrawn =
        this._pixiPlayers.filter((x) => x.id == socketPlayer.id).length > 0;

      if (!isPlayerDrawn) {
        let graphics: Graphics = this.drawPlayer(this._level, socketPlayer);
        const factory = new Factory();
        const player = factory.createGameEntity(
          socketPlayer,
          graphics,
          EntityType.Player
        );
        this._pixiPlayers.push(player);

        if (
          this._currentPixiPlayer == undefined &&
          socketPlayer.id == socket.currentPlayerId
        ) {
          this._level.position.set(
            this.app.view.width / 2 - socketPlayer.position.x,
            this.app.view.height / 2 - socketPlayer.position.y
          );
          this._currentPixiPlayer = player;
        }
      } else {
        if (socketPlayer.id != socket.currentPlayerId) {
          // console.log(`User: ${socketPlayer.id}, x: ${socketPlayer.position.x}, y: ${socketPlayer.position.y}`);
          const pixiPlayer = this._pixiPlayers.find(
            (x) => x.id == socketPlayer.id
          );
          if (pixiPlayer) {
            pixiPlayer.graphics.clear();
            pixiPlayer.graphics.beginFill(0xff0000);
            pixiPlayer.graphics.drawCircle(0, 0, 50);
            pixiPlayer.graphics.position.set(
              socketPlayer.position.x,
              socketPlayer.position.y
            );
          }
        }
      }
    }

    if (this._currentPixiPlayer != undefined) {
      const socketPlayer: SocketPlayer = new SocketPlayer();
      const levelBounds = this._level.getBounds();

      // console.log(`x: ${levelBounds.x - currentPlayerBounds.x}, y: ${levelBounds.y - currentPlayerBounds.y}`);
      socketPlayer.id = this._currentPixiPlayer.id;
      socketPlayer.position = new SocketPosition();
      socketPlayer.position.x = this._currentPixiPlayer?.graphics.position.x;
      socketPlayer.position.y = this._currentPixiPlayer?.graphics.position.y;

      // console.log("x, y", socketPlayer.position.x, socketPlayer.position.y);

      socket.sendPlayerPosition(socketPlayer);
    }
  }

  // TODO: extract to factory
  public drawPlayer(container: Container, player: SocketPlayer) {
    const obj = new Graphics();
    obj.beginFill(0xff0000);
    obj.drawCircle(0, 0, 50);
    container.addChild(obj);
    obj.position.set(player.position.x, player.position.y);
    return obj;
  }
}
