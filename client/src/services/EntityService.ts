import {
  CirclePickupFactory,
  SquarePickupFactory,
} from "./../core/Factories/AbstractFactory";
import PickupType from "@shared/constants/PickupType";
import SocketPickup from "@shared/contracts/SocketPickup";
import SocketPlayer from "@shared/contracts/SocketPlayer";
import MainPlayer from "../components/MainPlayer";
import Player from "../components/Player";
import Position from "../components/Position";
import IAutoService from "../core/interfaces/IAutoService";
import IEntity from "../core/interfaces/IEntity";
import IGameManager from "../core/interfaces/IGameManager";
import IPickup from "../core/interfaces/IPickup";

export default class EntityService implements IAutoService {
  private _gameManager: IGameManager = null!;
  public get gameManager() {
    return this._gameManager;
  }

  private _entities: IEntity[] = [];
  public get entities() {
    return this._entities;
  }

  private _pickups: IPickup[] = [];
  public get pickups() {
    return this._pickups;
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
        player.size,
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
        player.size,
        this._gameManager
      )
    );
  }

  public updatePlayers(players: Record<string, SocketPlayer>) {
    let alive = false;
    this._entities.forEach((e) => {
      if (e.id === this._mainPlayer.id) {
        alive = true;
        return;
      }
      if (players[e.id]) {
        const player = players[e.id];
        e.move(player.position.x, player.position.y, player.size);
      } else {
        this.removeEntity(e);
      }
    });

    if (!alive) {
      // TODO: Allow main player to be undefined - game over state.
      this._mainPlayer = undefined;
      this.removeEntity(this._mainPlayer);
    }
  }

  public addCurrentPlayers(players: SocketPlayer[]) {
    players.forEach((p) => {
      if (p.id === this._mainPlayer.id) return;
      this.addEntity(
        new Player(
          p.id,
          p.name,
          new Position(p.position.x, p.position.y),
          p.size,
          this._gameManager
        )
      );
    });
  }

  public spawnPickups(pickups: SocketPickup[]) {
    // THIS IS SCUFFED AND TEMPORARY // TODO: MOVE FACTORY INTO LevelBase
    const factory = new CirclePickupFactory();
    // --------------------------------------
    pickups.forEach((p) => {
      this._pickups.push(
        factory.createPickupEntity(
          p.id,
          new Position(p.position.x, p.position.y),
          this._gameManager,
          p.type
        )
      );
    });
  }

  public removePickup(pickup: IPickup) {
    const pickupIndex = this._pickups.indexOf(pickup);
    this._pickups.splice(pickupIndex, 1);
    pickup.destroy();
  }

  public updatePickup(pickup: SocketPickup) {
    const factory = new SquarePickupFactory();
    this._pickups[pickup.id].destroy();
    this._pickups[pickup.id] = factory.createPickupEntity(
      pickup.id,
      new Position(pickup.position.x, pickup.position.y),
      this._gameManager,
      pickup.type
    );
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
