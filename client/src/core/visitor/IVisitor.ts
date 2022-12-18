import IVisitee from "./IVisitee";

export default interface IVisitor {
  visit(element: IVisitee): void;
}
