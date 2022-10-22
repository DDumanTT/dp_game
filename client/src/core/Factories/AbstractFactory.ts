import { Graphics } from "pixi.js";

import {
  CirclePickupType,
  SquarePickupType,
} from "../interfaces/IEntityFactory";
import { GrowPickup, SpeedPickup } from "../../components/Pickup";
import IGameManager from "../interfaces/IGameManager";
import Position from "../../components/Position";
import IPickup from "../interfaces/IPickup";
import LevelPickerService from "../../services/LevelPickerService";
import PickupType from "@shared/constants/PickupType";

abstract class Factory {
  public abstract createPickupEntity(
    id: number,
    spawnPosition: Position,
    gameManager: IGameManager,
    pickupType: PickupType
  ): IPickup;
}

export class CirclePickupFactory extends Factory {
  createPickupEntity(
    id: number,
    spawnPosition: Position,
    gameManager: IGameManager,
    pickupType: PickupType
  ) {
    const graphics = this.draw(spawnPosition, gameManager);
    switch (pickupType) {
      case PickupType.Grow:
        return new GrowPickup(id, spawnPosition, graphics, gameManager);
      case PickupType.Speed:
        return new SpeedPickup(id, spawnPosition, graphics, gameManager);
      default:
        throw "Unknown CirclePickupType";
    }
  }

  private draw(position: Position, gameManager: IGameManager) {
    const levelPicker = gameManager.getService(LevelPickerService);
    const obj = new Graphics();
    obj.beginFill(Math.floor(Math.random() * 0xffffff));
    obj.drawCircle(-5, -5, 10);
    obj.position.set(position.x, position.y);
    levelPicker.level.container.addChild(obj);
    return obj;
  }
}

export class SquarePickupFactory extends Factory {
  createPickupEntity(
    id: number,
    spawnPosition: Position,
    gameManager: IGameManager,
    pickupType: PickupType
  ) {
    const graphics = this.draw(spawnPosition, gameManager);
    switch (pickupType) {
      case PickupType.Grow:
        return new GrowPickup(id, spawnPosition, graphics, gameManager);
      case PickupType.Speed:
        return new SpeedPickup(id, spawnPosition, graphics, gameManager);
      default:
        throw "Unknown SquarePickupType";
    }
  }

  private draw(position: Position, gameManager: IGameManager) {
    const levelPicker = gameManager.getService(LevelPickerService);
    const obj = new Graphics();
    obj.beginFill(Math.floor(Math.random() * 0xffffff));
    obj.drawRect(-10, -10, 20, 20);
    obj.angle = 45;
    obj.position.set(position.x, position.y);
    levelPicker.level.container.addChild(obj);
    return obj;
  }
}

//experimental
