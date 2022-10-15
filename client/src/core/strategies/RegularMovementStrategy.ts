import IMovementStrategy from "../interfaces/IMovementStrategy";

export default class RegularMovementStrategy implements IMovementStrategy {
  move(initX: number, initY: number, x: number, y: number): [number, number] {
    return [initX + x, initY + y];
  }
}
