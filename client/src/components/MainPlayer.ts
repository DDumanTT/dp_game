import config from "@shared/config";
import { Graphics } from "pixi.js";
import IEntity from "../core/interfaces/IEntity";
import IMovementStrategy from "../core/interfaces/IMovementStrategy";
import InvertedMovementStrategy from "../core/strategies/InvertedMovementStrategy";
import RegularMovementStrategy from "../core/strategies/RegularMovementStrategy";
import SocketCommunicator from "../services/communicators/SocketCommunicator";
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
    if (this._graphics.x < 50) {
      this._graphics.x = 50;
    } else if (this._graphics.x > config.world.width - 50) {
      this._graphics.x = config.world.width - 50;
    }

    if (this._graphics.y < 50) {
      this._graphics.y = 50;
    } else if (this._graphics.y > config.world.height - 50) {
      this._graphics.y = config.world.height - 50;
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

  public update(delta: number): void {
    const levelPicker = this._gameManager.getService(LevelPickerService);
    this.followMouse(delta);
    // this.interpolate(delta);
    this.keepWithinBounds();
    levelPicker.follow(this.graphics.position, this._gameManager.app);
  }
}
