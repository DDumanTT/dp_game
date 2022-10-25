import Position from "./Position";
import { Graphics } from "pixi.js";
import IGameManager from "../core/interfaces/IGameManager";
import BasePickup from "../core/base/BasePickup";
import Player from "./Player";
import SocketCommunicator from "../services/communicators/SocketCommunicator";
import EntityService from "../services/EntityService";
import LevelPickerService from "../services/LevelPickerService";
import config from "@shared/config";

export class GrowPickup extends BasePickup {
  activate(player: Player) {
    const socket = this.gameManager.getService(SocketCommunicator);
    socket.emitRemovePickup(this.id);

    const levelPicker = this.gameManager.getService(LevelPickerService);
    player.size += 1;

    // const scale = (levelPicker.level.container.width - 10) / config.world.width;
    // levelPicker.level.container.scale.set(scale);
    levelPicker.level.container.scale.x =
      1 - player.size / levelPicker.level.container.x;
    levelPicker.level.container.scale.y =
      1 - player.size / levelPicker.level.container.x;

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
