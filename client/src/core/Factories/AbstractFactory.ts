import {
  CirclePickupType,
  SquarePickupType,
} from "../interfaces/IEntityFactory";
import { Grow, Pickup, Speed } from "../../components/Mass";

abstract class Factory {
  public abstract createPickupEntity(
    name: string,
    pickupType: SquarePickupType | CirclePickupType
  ): Pickup;
}

export class CirclePickupFactory extends Factory {
  createPickupEntity(name: string, pickupType: CirclePickupType) {
    switch (pickupType) {
      case CirclePickupType.Grow:
        return new Grow(name);
      case CirclePickupType.Speed:
        return new Speed(name);
      default:
        throw "Unknown CirclePickupType";
    }
  }
}

export class SquarePickupFactory extends Factory {
  createPickupEntity(name: string, pickupType: SquarePickupType) {
    switch (pickupType) {
      case SquarePickupType.Grow:
        return new Grow(name);
      case SquarePickupType.Speed:
        return new Speed(name);
      default:
        throw "Unknown SquarePickupType";
    }
  }
}
