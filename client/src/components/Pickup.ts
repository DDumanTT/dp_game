import Position from "./Position";
import { Graphics } from "pixi.js";
import IGameManager from "../core/interfaces/IGameManager";
import BasePickup from "../core/base/BasePickup";
import Player from "./Player";
import SocketCommunicator from "../services/communicators/SocketCommunicator";
import EntityService from "../services/EntityService";
import LevelPickerService from "../services/LevelPickerService";

export class GrowPickup extends BasePickup {
  activate(player: Player) {
    const socket = this.gameManager.getService(SocketCommunicator);
    socket.emitRemovePickup(this.id);
    // const entityService = this.gameManager.getService(EntityService);
    // entityService.removePickup(this);
    // this.destroy();

    // const levelPicker = this.gameManager.getService(LevelPickerService);
    // levelPicker.level.container.width -= 10;
    // levelPicker.level.container.height -= 10;
    // player.graphics.width += 10;
    // player.graphics.height += 10;

    console.log("We getting bigger");
  }
}

export class SpeedPickup extends BasePickup {
  activate(player: Player) {
    const socket = this.gameManager.getService(SocketCommunicator);
    socket.emitRemovePickup(this.id);
    // const entityService = this.gameManager.getService(EntityService);
    // entityService.removePickup(this);
    // this.destroy();

    console.log("SPEED IS KEY");
  }
}
