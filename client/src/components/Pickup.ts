import config from "@shared/config";
import BasePickup from "../core/base/BasePickup";
import InvertedMovementStrategy from "../core/strategies/InvertedMovementStrategy";
import GrowVisitor from "../core/visitor/GrowVisitor";
import ReverseMovementVisitor from "../core/visitor/reverseMovementVisitor";
import SpeedUpVisitor from "../core/visitor/SpeedUpVisitor";
import SocketCommunicator from "../services/communicators/SocketCommunicator";
import LevelPickerService from "../services/LevelPickerService";
import MainPlayer from "./MainPlayer";

export class GrowPickup extends BasePickup {
  activate(player: MainPlayer): void {
    const socket = this.gameManager.getService(SocketCommunicator);
    socket.emitRemovePickup(this.id);

    const grow = new GrowVisitor();
    player.accept(grow);

    console.log("We getting bigger");
  }
}

export class SpeedPickup extends BasePickup {
  activate(player: MainPlayer) {
    if (player.spedUp) return;
    const socket = this.gameManager.getService(SocketCommunicator);
    socket.emitRemovePickup(this.id);

    const speedUp = new SpeedUpVisitor();
    player.accept(speedUp);

    console.log("SPEED IS KEY");
  }
}

export class ReversePickup extends BasePickup {
  activate(player: MainPlayer) {
    if (player.movementStrategy instanceof InvertedMovementStrategy) return;
    const socket = this.gameManager.getService(SocketCommunicator);
    socket.emitRemovePickup(this.id);

    const reverseMovement = new ReverseMovementVisitor();
    player.accept(reverseMovement);

    console.log("uno reverse card");
  }
}
