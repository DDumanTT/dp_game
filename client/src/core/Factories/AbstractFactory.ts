import { Graphics, ILineStyleOptions } from "pixi.js";

import {
  CirclePickupType,
  SquarePickupType,
} from "../interfaces/IEntityFactory";
import {
  GrowPickup,
  ReversePickup,
  SpeedPickup,
} from "../../components/Pickup";
import IGameManager from "../interfaces/IGameManager";
import Position from "../../components/Position";
import IPickup from "../interfaces/IPickup";
import LevelPickerService from "../../services/LevelPickerService";
import PickupType from "@shared/constants/PickupType";

export interface IPickupFactory {
  createPickupEntity(
    id: number,
    spawnPosition: Position,
    pickupType: PickupType
  ): IPickup;
}

abstract class PickupFactory implements IPickupFactory {
  protected _gameManager: IGameManager;

  constructor(gameManager: IGameManager) {
    this._gameManager = gameManager;
  }

  public abstract createPickupEntity(
    id: number,
    spawnPosition: Position,
    pickupType: PickupType
  ): IPickup;
}

export class CirclePickupFactory extends PickupFactory {
  createPickupEntity(
    id: number,
    spawnPosition: Position,
    pickupType: PickupType
  ) {
    switch (pickupType) {
      case PickupType.Grow:
        return new GrowPickup(
          id,
          spawnPosition,
          this.draw(spawnPosition, undefined),
          this._gameManager
        );
      case PickupType.Speed:
        var lineStyle: ILineStyleOptions = { width: 5, color: 0x000000 };
        return new SpeedPickup(
          id,
          spawnPosition,
          this.draw(spawnPosition, lineStyle),
          this._gameManager
        );
      case PickupType.Reverse:
        var lineStyle: ILineStyleOptions = { width: 5, color: 0x000000 };
        return new ReversePickup(
          id,
          spawnPosition,
          this.draw(spawnPosition, lineStyle),
          this._gameManager
        );
      default:
        throw "Unknown CirclePickupType";
    }
  }

  private draw(position: Position, lineStyle: ILineStyleOptions | undefined) {
    const obj = new Graphics();
    const color = Math.floor(Math.random() * 0xffffff);
    obj.beginFill(color);
    obj.lineStyle(lineStyle);
    obj.drawCircle(0, 0, 10);
    obj.position.set(position.x, position.y);
    return obj;
  }
}

export class SquarePickupFactory extends PickupFactory {
  createPickupEntity(
    id: number,
    spawnPosition: Position,
    pickupType: PickupType
  ) {
    switch (pickupType) {
      case PickupType.Grow:
        return new GrowPickup(
          id,
          spawnPosition,
          this.draw(spawnPosition, undefined),
          this._gameManager
        );
      case PickupType.Speed:
        var lineStyle: ILineStyleOptions = { width: 5, color: 0x000000 };
        return new SpeedPickup(
          id,
          spawnPosition,
          this.draw(spawnPosition, lineStyle),
          this._gameManager
        );
      case PickupType.Reverse:
        var lineStyle: ILineStyleOptions = { width: 5, color: 0x000000 };
        return new ReversePickup(
          id,
          spawnPosition,
          this.draw(spawnPosition, lineStyle),
          this._gameManager
        );
      default:
        throw "Unknown SquarePickupType";
    }
  }

  private draw(position: Position, lineStyle: ILineStyleOptions | undefined) {
    const obj = new Graphics();
    obj.beginFill(Math.floor(Math.random() * 0xffffff));
    obj.lineStyle(lineStyle);
    obj.drawRect(-10, -10, 20, 20);
    obj.angle = 45;
    obj.position.set(position.x, position.y);
    return obj;
  }
}

//experimental
