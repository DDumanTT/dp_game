import config from "@shared/config";
import BasePickup from "../core/base/BasePickup";
import InvertedMovementStrategy from "../core/strategies/InvertedMovementStrategy";
import SocketCommunicator from "../services/communicators/SocketCommunicator";
import LevelPickerService from "../services/LevelPickerService";
import MainPlayer from "./MainPlayer";

export class GrowPickup extends BasePickup {
  activate(player: MainPlayer): void {
    const socket = this.gameManager.getService(SocketCommunicator);
    socket.emitRemovePickup(this.id);

    const levelPicker = this.gameManager.getService(LevelPickerService);
    if (player.size < Math.min(config.world.width, config.world.height) / 25) {
      player.size += 1;
    }

    levelPicker.level.container.scale.x =
      1 - player.size / levelPicker.level.container.x;
    levelPicker.level.container.scale.y =
      1 - player.size / levelPicker.level.container.x;

    if (levelPicker.level.container.scale.x < 0.05)
      levelPicker.level.container.scale.set(0.05);

    console.log("We getting bigger");
  }
}

export class SpeedPickup extends BasePickup {
  activate(player: MainPlayer) {
    if (player.isSpeed) return;
    const socket = this.gameManager.getService(SocketCommunicator);
    socket.emitRemovePickup(this.id);
    player.speedUp(2, 5000);

    console.log("SPEED IS KEY");
  }
}

export class ReversePickup extends BasePickup {
  activate(player: MainPlayer) {
    if (player.movementStrategy instanceof InvertedMovementStrategy) return;
    const socket = this.gameManager.getService(SocketCommunicator);
    socket.emitRemovePickup(this.id);
    player.reverseMovement(5000);

    console.log("uno reverse card");
  }
}
