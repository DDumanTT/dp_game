import config from "@shared/config";
import SocketPlayer from "@shared/contracts/SocketPlayer";
import SocketPosition from "@shared/contracts/SocketPosition";
import { Graphics } from "pixi.js";
import MainPlayer from "../components/MainPlayer";
import Player from "../components/Player";
import Position from "../components/Position";
import IAutoService from "../core/interfaces/IAutoService";
import IEntity from "../core/interfaces/IEntity";
import IGameManager from "../core/interfaces/IGameManager";

export default class EntityService implements IAutoService {
  private _gameManager: IGameManager = null!;
  public get gameManager() {
    return this._gameManager;
  }

  private _entities: IEntity[] = [];
  public get entities() {
    return this._entities;
  }

  private _mainPlayer: MainPlayer = null!;
  public get mainPlayer() {
    return this._mainPlayer;
  }

  private _mainPlayerInitialized = false;

  public addEntity(entity: IEntity) {
    this._entities.push(entity);
  }

  public removeEntity(entity: IEntity) {
    const entityIndex = this._entities.indexOf(entity);
    if (entityIndex > -1) {
      entity.destroy();
      this._entities.splice(entityIndex, 1);
    }
  }

  public spawnPlayer(player: SocketPlayer) {
    if (!this._mainPlayerInitialized) {
      this._mainPlayer = new MainPlayer(
        player.id,
        player.name,
        new Position(player.position.x, player.position.y),
        this._gameManager
      );

      this._mainPlayerInitialized = true;
      this.addEntity(this._mainPlayer);
      return;
    }

    this.addEntity(
      new Player(
        player.id,
        player.name,
        new Position(player.position.x, player.position.y),
        this._gameManager
      )
    );
  }

  public updatePositions(players: Record<string, SocketPlayer>) {
    this._entities.forEach((e) => {
      if (e.id === this._mainPlayer.id) return;
      if (players[e.id]) {
        e.move(players[e.id].position.x, players[e.id].position.y);
      } else {
        this.removeEntity(e);
      }
    });
  }

  public addCurrentPlayers(players: SocketPlayer[]) {
    players.forEach((p) => {
      if (p.id === this._mainPlayer.id) return;
      this.addEntity(
        new Player(
          p.id,
          p.name,
          new Position(p.position.x, p.position.y),
          this._gameManager
        )
      );
    });
  }

  execute(gameManager: IGameManager): void {
    this._gameManager = gameManager;

    // this._mainPlayer = new MainPlayer(
    //   "",
    //   "",
    //   new Position(config.world.width / 2, config.world.height / 2),
    //   this._gameManager,
    //   new Graphics()
    // );
  }
}
