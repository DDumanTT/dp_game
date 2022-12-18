import { Graphics, ILineStyleOptions } from "pixi.js";
import {
  GrowPickup,
  ReversePickup,
  SpeedPickup,
} from "../../components/Pickup";
import IGameManager from "../interfaces/IGameManager";
import Position from "../../components/Position";
import IPickup from "../interfaces/IPickup";
import PickupTypeKey from "../../components/PickupTypeKey";
import PickupType from "@shared/constants/PickupType";

export interface IPickupFactory {
  createPickup(id: number, spawnPosition: Position, type: PickupType): IPickup;
}

abstract class PickupFactory implements IPickupFactory {
  protected _gameManager: IGameManager;

  constructor(gameManager: IGameManager) {
    this._gameManager = gameManager;
  }

  abstract createPickup(
    id: number,
    spawnPosition: Position,
    type: PickupType
  ): IPickup;
}

export class CirclePickupFactory extends PickupFactory {
  private PickupTypes: PickupTypeKey[] = [];

  lineStyle: ILineStyleOptions = { width: 5, color: 0xffffff };

  createPickup(id: number, spawnPosition: Position, type: PickupType): IPickup {
    let key = this.PickupTypes.find((t) => t.type === type);

    if (!key) {
      key = new PickupTypeKey(type);

      this.PickupTypes.push(key);
    }

    switch (key?.type) {
      case PickupType.Grow:
        return new GrowPickup(
          id,
          spawnPosition,
          this.draw(spawnPosition, undefined),
          this._gameManager,
          key
        );
      case PickupType.Speed:
        return new SpeedPickup(
          id,
          spawnPosition,
          this.draw(spawnPosition, this.lineStyle),
          this._gameManager,
          key
        );
      case PickupType.Reverse:
        return new ReversePickup(
          id,
          spawnPosition,
          this.draw(spawnPosition, this.lineStyle),
          this._gameManager,
          key
        );
    }

    throw new Error("Invalid pickup type");
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

// abstract createGrowPickup(id: number, spawnPosition: Position): IPickup;
// abstract createSpeedPickup(id: number, spawnPosition: Position): IPickup;
// abstract createReversePickup(id: number, spawnPosition: Position): IPickup;

// createGrowPickup(id: number, spawnPosition: Position): IPickup;
// createSpeedPickup(id: number, spawnPosition: Position): IPickup;
// createReversePickup(id: number, spawnPosition: Position): IPickup;

// createSpeedPickup(id: number, spawnPosition: Position): IPickup {
//   const lineStyle: ILineStyleOptions = { width: 5, color: 0xffffff };
//   return new SpeedPickup(
//     id,
//     spawnPosition,
//     this.draw(spawnPosition, lineStyle),
//     this._gameManager
//   );
// }

// createReversePickup(id: number, spawnPosition: Position): IPickup {
//   const lineStyle: ILineStyleOptions = { width: 5, color: 0xffffff };
//   return new ReversePickup(
//     id,
//     spawnPosition,
//     this.draw(spawnPosition, lineStyle),
//     this._gameManager
//   );
// }

// export class SquarePickupFactory extends PickupFactory {
//   createGrowPickup(id: number, spawnPosition: Position): IPickup {
//     return new GrowPickup(
//       id,
//       spawnPosition,
//       this.draw(spawnPosition, undefined),
//       this._gameManager
//     );
//   }

//   createSpeedPickup(id: number, spawnPosition: Position): IPickup {
//     const lineStyle: ILineStyleOptions = { width: 5, color: 0xffffff };
//     return new SpeedPickup(
//       id,
//       spawnPosition,
//       this.draw(spawnPosition, lineStyle),
//       this._gameManager
//     );
//   }

//   createReversePickup(id: number, spawnPosition: Position): IPickup {
//     const lineStyle: ILineStyleOptions = { width: 5, color: 0xffffff };
//     return new ReversePickup(
//       id,
//       spawnPosition,
//       this.draw(spawnPosition, lineStyle),
//       this._gameManager
//     );
//   }

//   private draw(position: Position, lineStyle: ILineStyleOptions | undefined) {
//     const obj = new Graphics();
//     obj.beginFill(Math.floor(Math.random() * 0xffffff));
//     obj.lineStyle(lineStyle);
//     obj.drawRect(-10, -10, 20, 20);
//     obj.angle = 45;
//     obj.position.set(position.x, position.y);
//     return obj;
//   }
// }
