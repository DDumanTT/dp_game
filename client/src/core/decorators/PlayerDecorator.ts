import { Graphics } from "pixi.js";
import Player from "../../components/Player";
import Position from "../../components/Position";
import BasePickup from "../base/BasePickup";
import IGameManager from "../interfaces/IGameManager";
import IPickup from "../interfaces/IPickup";
import IEntity from "../interfaces/IEntity";

export default class PlayerDecorator {
  constructor(public player: Player) {}

  public increaseSize(amount: number) {
    this.player.graphics.scale.x += amount;
    this.player.graphics.scale.y += amount;
  }
}

// abstract class PPlayerDecorator implements IEntity {
//   abstract get id(): string;
//   abstract get graphics(): Graphics;
//   abstract get size(): number;
//   abstract destroy(): void;
//   abstract move(x: number, y: number, size: number): void;
//   abstract update(delta: number): void;
// }

// class MainPlayerDecorator extends PPlayerDecorator {}

// FAILED EXAMPLE
//
// abstract class PickupDecorator implements IPickup {
//   decoratedPickup: IPickup;
//   constructor(decorated: IPickup) {
//     this.decoratedPickup = decorated;
//   }
//   get position(): Position {
//     throw new Error("Method not implemented.");
//   }
//   get id(): number {
//     throw new Error("Method not implemented.");
//   }
//   destroy(): void {
//     throw new Error("Method not implemented.");
//   }
//   public abstract activate(): void;
// }

// class GrowPickup extends PickupDecorator {
//   decoratedPickup: IPickup;

//   constructor(decorated: IPickup) {
//     super(decorated);
//     this.decoratedPickup = decorated;
//   }

//   public activate() {
//     return this.decoratedPickup;
//   }
// }
