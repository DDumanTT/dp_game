import MainPlayer from "../../components/MainPlayer";
import InvertedMovementStrategy from "../strategies/InvertedMovementStrategy";
import RegularMovementStrategy from "../strategies/RegularMovementStrategy";
import IVisitee from "./IVisitee";
import IVisitor from "./IVisitor";

export default class ReverseMovementVisitor implements IVisitor {
  visit(element: IVisitee): void {
    if (element instanceof MainPlayer) {
      element.setMovementStrategy(new InvertedMovementStrategy());
      setTimeout(() => {
        element.setMovementStrategy(new RegularMovementStrategy());
      }, 5000);
    }
  }
}
