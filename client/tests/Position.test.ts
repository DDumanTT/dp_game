import Position from "../src/components/Position";
import { describe, expect, test } from "vitest";

describe("Position test", () => {
  test.each([
    [1, 2],
    [5, 5],
    [10, 56],
  ])("Creates position with x: %i, y: %i coordinates", (x, y) => {
    const position = new Position(x, y);

    expect(position.x);
    expect(position.y);
  });

  test.each([
    [1, 2],
    [5, 5],
    [10, 56],
  ])("Sets position with x: %i, y: %i coordinates", (x, y) => {
    const position = new Position(0, 0);

    position.set(x, y);

    expect(position.x);
    expect(position.y);
  });

  test("Clones object and keeps original state after change", () => {
    const position = new Position(0, 0);
    const position2 = position.clone();
    position2.x = 100;
    position2.y = 100;

    expect(position.x).toBe(0);
    expect(position.y).toBe(0);
    expect(position2.y).toBe(100);
    expect(position2.y).toBe(100);
  });
});
