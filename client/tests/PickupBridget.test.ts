import PickUpBridge from "../src/core/bridge/PickupAbstraction";
import { describe, expect, test } from "vitest";
import { mock } from "vitest-mock-extended";
import { GrowPickup } from "../src/components/Pickup";
import MainPlayer from "../src/components/MainPlayer";

describe("PickUpBridge test", () => {
  test("Activates pickup bridge", () => {
    const pickup = mock<GrowPickup>();
    const player = mock<MainPlayer>();
    const position = new PickUpBridge(pickup);

    expect(pickup).toHaveBeenCalledWith();
    expect(position.y);
  });
});
