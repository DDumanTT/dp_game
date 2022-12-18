import MainPlayer from "../../components/MainPlayer";
import IVisitee from "./IVisitee";
import IVisitor from "./IVisitor";

export default class SpeedUpVisitor implements IVisitor {
  visit(element: IVisitee): void {
    if (element instanceof MainPlayer) {
      element.spedUp = true;
      element.speed += 2;
      setTimeout(() => {
        element.spedUp = false;
        element.speed -= 2;
      }, 5000);
    }
  }
}
