import Position from "../../components/Position";

export default interface IMovementStrategy {
  move(initX: number, initY: number, x: number, y: number): [number, number];
}
