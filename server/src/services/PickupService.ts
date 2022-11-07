import SocketPosition from "@shared/contracts/SocketPosition";
import SocketPickup from "@shared/contracts/SocketPickup";
import PickupType from "@shared/constants/PickupType";
import config from "@shared/config";

export default class PickupService {
  private static _pickupService = new PickupService();

  private _pickups: SocketPickup[] = [];
  public get pickups(): SocketPickup[] {
    return this._pickups;
  }

  public static getInstance() {
    return PickupService._pickupService;
  }

  private constructor() {
    const pickupCount = Math.max(config.world.width, config.world.height) / 10;
    for (let i = 0; i < pickupCount; i++) {
      this._pickups.push({
        id: i,
        position: {
          x: this.generatePosition(15, config.world.width - 15),
          y: this.generatePosition(15, config.world.height - 15),
        },
        type: PickupType.Grow,
      });
    }
    for (let i = 0; i < pickupCount / 100; i++) {
      this._pickups.push({
        id: i + pickupCount,
        position: {
          x: this.generatePosition(15, config.world.width - 15),
          y: this.generatePosition(15, config.world.height - 15),
        },
        type: PickupType.Speed,
      });
    }
    for (let i = 0; i < 10; i++) {
      this._pickups.push({
        id: i + 990,
        position: {
          x: this.generatePosition(15, config.world.width - 15),
          y: this.generatePosition(15, config.world.height - 15),
        },
        type: PickupType.Reverse,
      });
    }
  }

  public consumePickup(id: number) {
    let consumePickup: SocketPickup;

    this._pickups[id] = {
      ...this._pickups[id],
      position: {
        x: this.generatePosition(15, config.world.width - 15),
        y: this.generatePosition(15, config.world.height - 15),
      },
    };
    return this._pickups[id];
  }

  private generatePosition(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
