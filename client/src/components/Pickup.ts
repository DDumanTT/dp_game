import { PickupArtifact } from "../core/interfaces/IEntityFactory";
import Position from "./Position";
import { Graphics } from "pixi.js";
import IGameManager from "../core/interfaces/IGameManager";

export abstract class BasePickupArtifact implements PickupArtifact {
  constructor(public name: string) {}

  abstract ability(): void;
}

export class Pickup extends BasePickupArtifact {
  constructor(public name: string) {
    super(name);
    console.log("Pickup created");
  }

  ability() {
    console.log("");
  }
}

export class Grow extends Pickup {
  constructor(
    id: string,
    name: string,
    spawnPosition: Position,
    gameManager: IGameManager,
    graphics?: Graphics
  ) {
    super(name);
    console.log("Grow Pickup created");
  }

  ability() {
    console.log("We getting bigger");
  }
}

export class Speed extends Pickup {
  constructor(
    id: string,
    name: string,
    spawnPosition: Position,
    gameManager: IGameManager,
    graphics?: Graphics
  ) {
    super(name);
    console.log("Speed Pickup created");
  }

  ability() {
    console.log("SPEED IS KEY");
  }
}
