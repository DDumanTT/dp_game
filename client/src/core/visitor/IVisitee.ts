import IVisitor from "./IVisitor";

export default interface IVisitee {
  accept(visitor: IVisitor): void;
}
