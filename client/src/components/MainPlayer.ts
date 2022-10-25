import config from "@shared/config";
import { Graphics } from "pixi.js";
import IEntity from "../core/interfaces/IEntity";
import IMovementStrategy from "../core/interfaces/IMovementStrategy";
import InvertedMovementStrategy from "../core/strategies/InvertedMovementStrategy";
import RegularMovementStrategy from "../core/strategies/RegularMovementStrategy";
import SocketCommunicator from "../services/communicators/SocketCommunicator";
import EntityService from "../services/EntityService";
import LevelPickerService from "../services/LevelPickerService";
import Player from "./Player";
import Position from "./Position";

export default class MainPlayer extends Player {
  private _mousePosition: Position = new Position(0, 0);

  private followMouse(delta: number) {
    const playerPosOnScreen = this.graphics.getGlobalPosition();
    const { x: mouseX, y: mouseY } =
      this._gameManager.app.renderer.plugins.interaction.mouse.global;

    let distance = Math.sqrt(
      (mouseX - playerPosOnScreen.x) ** 2 + (mouseY - playerPosOnScreen.y) ** 2
    );
    let angle = Math.atan2(
      mouseY - playerPosOnScreen.y,
      mouseX - playerPosOnScreen.x
    );

    distance = (distance.clamp(-300, 300) * delta) / 50;

    let x = distance * Math.cos(angle);
    let y = distance * Math.sin(angle);

    // Keeps player moving when mouse is off-screen
    this._mousePosition.set(x, y);
    this.move(this._mousePosition.x, this._mousePosition.y);
  }

  private keepWithinBounds() {
    if (this._graphics.x < this.size) {
      this._graphics.x = this.size;
    } else if (this._graphics.x > config.world.width - this.size) {
      this._graphics.x = config.world.width - this.size;
    }

    if (this._graphics.y < this.size) {
      this._graphics.y = this.size;
    } else if (this._graphics.y > config.world.height - this.size) {
      this._graphics.y = config.world.height - this.size;
    }
  }

  public move(x: number, y: number): [x: number, y: number] {
    const [newX, newY] = this._movementStrategy.move(
      this._graphics.position.x,
      this._graphics.position.y,
      x,
      y
    );
    this._graphics.position.x = newX;
    this._graphics.position.y = newY;
    this._targetPosition.set(newX, newY);
    const socket = this._gameManager.getService(SocketCommunicator);
    socket.sendPlayerPosition(this);
    return [newX, newY];
  }

  public checkCollisionWithPickups() {
    const { x, y } = this.graphics.position;
    const entityService = this._gameManager.getService(EntityService);
    entityService.pickups.forEach((p) => {
      const { x: pX, y: pY } = p.position;
      if (Math.sqrt((x - pX) ** 2 + (y - pY) ** 2) < this._size && p.id >= 0) {
        p.activate(this);
        p.destroy();
      }
    });
  }

  public checkCollisionWithPlayers() {
    const { x, y } = this.graphics.position;
    const entityService = this._gameManager.getService(EntityService);
    entityService.entities.forEach((p) => {
      if (p.id === this.id) return;
      const { x: pX, y: pY } = p.graphics.position;
      if (Math.sqrt((x - pX) ** 2 + (y - pY) ** 2) - this._size < 0) {
        if (this.size - p.size > 25) this.consume(p);
      }
    });
  }

  private consume(player: IEntity) {
    this.size += player.size;
    const entityService = this._gameManager.getService(EntityService);
    entityService.removeEntity(player);
    const socket = this._gameManager.getService(SocketCommunicator);
    socket.removePlayer(player.id);
  }

  public update(delta: number): void {
    const levelPicker = this._gameManager.getService(LevelPickerService);
    this.followMouse(delta);
    this.keepWithinBounds();
    levelPicker.follow(this.graphics.position, this._gameManager.app);
    this.checkCollisionWithPickups();
    this.checkCollisionWithPlayers();
  }
}
