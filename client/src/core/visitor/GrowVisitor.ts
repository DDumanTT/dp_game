import config from "@shared/config";
import MainPlayer from "../../components/MainPlayer";
import LevelPickerService from "../../services/LevelPickerService";
import IVisitee from "./IVisitee";
import IVisitor from "./IVisitor";

export default class GrowVisitor implements IVisitor {
  visit(element: IVisitee): void {
    if (element instanceof MainPlayer) {
      const levelPicker = element.gameManager.getService(LevelPickerService);
      if (
        element.size <
        Math.min(config.world.width, config.world.height) / 25
      ) {
        element.size += 1;
      }

      levelPicker.level.container.scale.x =
        1 - element.size / levelPicker.level.container.x;
      levelPicker.level.container.scale.y =
        1 - element.size / levelPicker.level.container.x;

      if (levelPicker.level.container.scale.x < 0.05)
        levelPicker.level.container.scale.set(0.05);
    }
  }
}
