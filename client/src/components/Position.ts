import IPrototype from "../core/interfaces/IPrototype";

class Position implements IPrototype<Position> {
  public x: number;
  public y: number;

  constructor(x: number, y: number);
  constructor(pos: Position);
  constructor(x: number | Position, y?: number) {
    if (x instanceof Position) {
      const pos = x;
      this.x = pos.x;
      this.y = pos.y;
    } else if (y !== undefined) {
      this.x = x;
      this.y = y;
    } else {
      throw new Error("Position must contain x and y values.");
    }
  }

  public set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  clone(): Position {
    return new Position(this);
  }
}

export default Position;
