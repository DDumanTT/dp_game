import config from "@shared/config";
import { Graphics } from "pixi.js";
import IEntity from "../core/interfaces/IEntity";
import IGameManager from "../core/interfaces/IGameManager";
import IMovementStrategy from "../core/interfaces/IMovementStrategy";
import InvertedMovementStrategy from "../core/strategies/InvertedMovementStrategy";
import RegularMovementStrategy from "../core/strategies/RegularMovementStrategy";
import SocketCommunicator from "../services/communicators/SocketCommunicator";
import EntityService from "../services/EntityService";
import LevelPickerService from "../services/LevelPickerService";
import Player from "./Player";
import Position from "./Position";

export default class MainPlayer implements IEntity {
  private _mousePosition: Position = new Position(0, 0);
  private _speed: number = 5;
  private _player: IEntity;

  constructor(player: IEntity) {
    this._player = player;
  }
  get name(): string {
    return this._player.name;
  }
  set size(value: number) {
    this._player.size = value;
  }

  get gameManager(): IGameManager {
    return this._player.gameManager;
  }
  get targetPosition(): Position {
    return this._player.targetPosition;
  }
  get id(): string {
    return this._player.id;
  }
  get graphics(): Graphics {
    return this._player.graphics;
  }
  get size(): number {
    return this._player.size;
  }
  destroy(): void {
    this._player.destroy();
  }

  private _movementStrategy: IMovementStrategy = new RegularMovementStrategy();
  public get movementStrategy() {
    return this._movementStrategy;
  }
  public setMovementStrategy(strategy: IMovementStrategy) {
    this._movementStrategy = strategy;
  }

  private followMouse(delta: number) {
    const playerPosOnScreen = this.graphics.getGlobalPosition();
    const { x: mouseX, y: mouseY } =
      this._player.gameManager.app.renderer.plugins.interaction.mouse.global;

    let distance = Math.sqrt(
      (mouseX - playerPosOnScreen.x) ** 2 + (mouseY - playerPosOnScreen.y) ** 2
    );
    let angle = Math.atan2(
      mouseY - playerPosOnScreen.y,
      mouseX - playerPosOnScreen.x
    );

    distance = (distance.clamp(0, 300) / 300) * delta * this._speed;

    let x = distance * Math.cos(angle);
    let y = distance * Math.sin(angle);

    // Keeps player moving when mouse is off-screen
    this._mousePosition.set(x, y);
    this.move(this._mousePosition.x, this._mousePosition.y);
  }

  private keepWithinBounds() {
    if (this._player.graphics.x < this.size) {
      this._player.graphics.x = this.size;
    } else if (this._player.graphics.x > config.world.width - this.size) {
      this._player.graphics.x = config.world.width - this.size;
    }

    if (this._player.graphics.y < this.size) {
      this._player.graphics.y = this.size;
    } else if (this._player.graphics.y > config.world.height - this.size) {
      this._player.graphics.y = config.world.height - this.size;
    }
  }

  public move(x: number, y: number): [x: number, y: number] {
    const [newX, newY] = this._movementStrategy.move(
      this._player.graphics.position.x,
      this._player.graphics.position.y,
      x,
      y
    );
    this._player.graphics.position.x = newX;
    this._player.graphics.position.y = newY;
    this._player.targetPosition.set(newX, newY);
    const socket = this._player.gameManager.getService(SocketCommunicator);
    socket.sendPlayerPosition(this);
    return [newX, newY];
  }

  private _spedUp = false;
  public get isSpeed() {
    return this._spedUp;
  }

  public speedUp(amount: number, time: number) {
    this._spedUp = true;
    this._speed += amount;
    setTimeout(() => {
      this._spedUp = false;
      this._speed -= amount;
    }, time);
  }

  public reverseMovement(time: number) {
    this.setMovementStrategy(new InvertedMovementStrategy());
    setTimeout(() => {
      this.setMovementStrategy(new RegularMovementStrategy());
    }, time);
  }

  public checkCollisionWithPickups() {
    const { x, y } = this.graphics.position;
    const entityService = this._player.gameManager.getService(EntityService);
    entityService.pickups.forEach((p) => {
      const { x: pX, y: pY } = p.position;
      if (
        Math.sqrt((x - pX) ** 2 + (y - pY) ** 2) < this._player.size &&
        p.id >= 0
      ) {
        p.activate(this);
        p.destroy();
      }
    });
  }

  public checkCollisionWithPlayers() {
    const { x, y } = this.graphics.position;
    const entityService = this._player.gameManager.getService(EntityService);
    entityService.entities.forEach((p) => {
      if (p.id === this.id) return;
      const { x: pX, y: pY } = p.graphics.position;
      if (Math.sqrt((x - pX) ** 2 + (y - pY) ** 2) - this._player.size < 0) {
        if (this.size - p.size > 25) this.consume(p);
      }
    });
  }

  private consume(player: IEntity) {
    this._player.size += player.size;
    const entityService = this._player.gameManager.getService(EntityService);
    entityService.removeEntity(player);
    const socket = this._player.gameManager.getService(SocketCommunicator);
    socket.removePlayer(player.id);
  }

  public update(delta: number): void {
    const levelPicker = this._player.gameManager.getService(LevelPickerService);
    this.followMouse(delta);
    this.keepWithinBounds();
    levelPicker.follow(this.graphics.position, this._player.gameManager.app);
    this.checkCollisionWithPickups();
    this.checkCollisionWithPlayers();
  }
}
