import { EntityType } from "../interfaces/IEntityFactory";
import Player from "../../components/Player";
import SocketPlayer from "@shared/contracts/SocketPlayer";
import { Graphics } from "pixi.js";
import Position from "../../components/Position";

export class Factory {
  createGameEntity(
    socketPlayer: SocketPlayer,
    graphics: Graphics,
    entityType: EntityType
  ) {
    switch (entityType) {
      case EntityType.Player:
        return new Player(
          socketPlayer.id,
          socketPlayer.name,
          new Position(socketPlayer.position.x, socketPlayer.position.y),
          graphics
        );
      case EntityType.Enemy:
      // return new Pickup();
      default:
        throw new Error("Unknown Entity type");
    }
  }
}
