import {
  CirclePickupType,
  SquarePickupType,
} from "../interfaces/IEntityFactory";
import { Grow, Pickup, Speed } from "../../components/Pickup";
import IGameManager from "../interfaces/IGameManager";
import Position from "../../components/Position";
import { Graphics } from "pixi.js";

abstract class Factory {
  public abstract createPickupEntity(
    id: string,
    name: string,
    spawnPosition: Position,
    gameManager: IGameManager,
    pickupType: SquarePickupType | CirclePickupType,
    graphics?: Graphics
  ): Pickup;
}

export class CirclePickupFactory extends Factory {
  createPickupEntity(
    id: string,
    name: string,
    spawnPosition: Position,
    gameManager: IGameManager,
    pickupType: CirclePickupType,
    graphics?: Graphics
  ) {
    switch (pickupType) {
      case CirclePickupType.Grow:
        return new Grow(id, name, spawnPosition, gameManager, graphics);
      case CirclePickupType.Speed:
        return new Speed(id, name, spawnPosition, gameManager, graphics);
      default:
        throw "Unknown CirclePickupType";
    }
  }
}

export class SquarePickupFactory extends Factory {
  createPickupEntity(
    id: string,
    name: string,
    spawnPosition: Position,
    gameManager: IGameManager,
    pickupType: SquarePickupType,
    graphics?: Graphics
  ) {
    switch (pickupType) {
      case SquarePickupType.Grow:
        return new Grow(id, name, spawnPosition, gameManager, graphics);
      case SquarePickupType.Speed:
        return new Speed(id, name, spawnPosition, gameManager, graphics);
      default:
        throw "Unknown SquarePickupType";
    }
  }
}

//experimental
