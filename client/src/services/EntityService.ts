import SocketPickup from "@shared/contracts/SocketPickup";
import SocketPlayer from "@shared/contracts/SocketPlayer";
import MainPlayer from "../components/MainPlayer";
import Player from "../components/Player";
import Position from "../components/Position";
import IAutoService from "../core/interfaces/IAutoService";
import IEntity from "../core/interfaces/IEntity";
import IGameManager from "../core/interfaces/IGameManager";
import IPickup from "../core/interfaces/IPickup";
import Game from "../core/Game";
import LevelPickerService from "./LevelPickerService";
import PickupType from "@shared/constants/PickupType";
import { IPickupFactory } from "./../core/Factories/AbstractFactory";
import PickupList from "../core/iterators/PickupList";

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

  private _mainPlayer: MainPlayer | undefined = null!;
  public get mainPlayer() {
    return this._mainPlayer;
  }

  private _mainPlayerInitialized = false;

  public addEntity(entity: IEntity) {
    this._entities.push(entity);
  }

  public removeEntity(entity: IEntity) {
    const game = this._gameManager.getService(Game);
    const entitiesCount = this._entities.length;

    game.removeObserver(entity);
    this._entities = this.entities.filter((x) => x.id !== entity.id);

    if (entitiesCount != this._entities.length) {
      console.log("delete", entity.id);
      entity.graphics.visible = false;
      setTimeout(() => {
        entity.destroy();
      }, 1000);
    }
  }

  public spawnPlayer(player: SocketPlayer) {
    const game = this._gameManager.getService(Game);
    if (!this._mainPlayerInitialized) {
      const regularPlayer = new Player(
        player.id,
        player.name,
        player.color,
        new Position(player.position.x, player.position.y),
        player.size,
        this._gameManager
      );

      this._mainPlayer = new MainPlayer(regularPlayer);

      game.addObserver(this._mainPlayer);
      this._mainPlayerInitialized = true;
      this.addEntity(this._mainPlayer);
      return;
    }

    const _player = new Player(
      player.id,
      player.name,
      player.color,
      new Position(player.position.x, player.position.y),
      player.size,
      this._gameManager
    );

    game.addObserver(_player);

    this.addEntity(_player);
  }

  public updatePlayers(players: Record<string, SocketPlayer>) {
    let alive = false;
    this._entities.forEach((e) => {
      if (players[e.id]) {
        if (players[e.id].id === this._mainPlayer?.id) {
          alive = true;
          return;
        }
        const player = players[e.id];
        e.move(player.position.x, player.position.y, player.size);
      } else {
        this.removeEntity(e);
      }
    });

    if (!alive) {
      this._mainPlayer = undefined;
    }
  }

  public addCurrentPlayers(players: SocketPlayer[]) {
    const game = this._gameManager.getService(Game);

    players.forEach((p) => {
      if (p.id === this._mainPlayer?.id) return;
      const player = new Player(
        p.id,
        p.name,
        p.color,
        new Position(p.position.x, p.position.y),
        p.size,
        this._gameManager
      );
      game.addObserver(player);
      this.addEntity(player);
    });
  }

  private pickupSwitch(pickup: SocketPickup, factory: IPickupFactory) {
    let newPickup: IPickup;
    switch (pickup.type) {
      case PickupType.Grow:
        newPickup = factory.createGrowPickup(
          pickup.id,
          new Position(pickup.position.x, pickup.position.y)
        );
        break;
      case PickupType.Speed:
        newPickup = factory.createSpeedPickup(
          pickup.id,
          new Position(pickup.position.x, pickup.position.y)
        );
        break;
      case PickupType.Reverse:
        newPickup = factory.createReversePickup(
          pickup.id,
          new Position(pickup.position.x, pickup.position.y)
        );
        break;
      default:
        throw new Error("Invalid pickup type.");
    }
    return newPickup;
  }

  public spawnPickups(pickups: PickupList) {
    const levelPicker = this._gameManager.getService(LevelPickerService);
    const factory = levelPicker.level.pickupFactory;

    const enumerator = pickups.getEnumerator();

    while(enumerator.moveNext()) {
      this._pickups.push(this.pickupSwitch(enumerator.current!, factory));
    }
  }

  public removePickup(pickup: IPickup) {
    const pickupIndex = this._pickups.indexOf(pickup);
    this._pickups.splice(pickupIndex, 1);
    pickup.destroy();
  }

  public updatePickup(pickup: SocketPickup) {
    const levelPicker = this._gameManager.getService(LevelPickerService);
    const factory = levelPicker.level.pickupFactory;
    this._pickups[pickup.id].destroy();
    this._pickups[pickup.id] = this.pickupSwitch(pickup, factory);
  }

  execute(gameManager: IGameManager): void {
    this._gameManager = gameManager;
  }
}
