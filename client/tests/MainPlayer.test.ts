import { test, expect, beforeEach, vi, describe } from "vitest";
import { mock } from "vitest-mock-extended";
import MainPlayer from "../src/components/MainPlayer";
import Player from "../src/components/Player";
import Position from "../src/components/Position";
import ConsumeCommand from "../src/core/commands/ConsumeCommand";
import MoveMainCommand from "../src/core/commands/MoveMainCommand";

// vi.mock("../src/components/Player");
// vi.mock("../src/components/MainPlayer");

describe("MainPlayer", () => {
  beforeEach(() => {});

  // Parameterized test that contains stub and mock
  test.each([
    [1, 2],
    [5, 5],
    [10, 56],
  ])("player follows mouse x: %i, y: %i", (x, y) => {
    // Arrange
    const player = mock<Player>(); // stub
    const moveMainCommand = mock<MoveMainCommand>(); // mock
    var mainPlayer = new MainPlayer(player);
    mainPlayer._moveCommand = moveMainCommand;

    // Act
    mainPlayer.move(x, y);

    // Assert
    expect(moveMainCommand.execute).toHaveBeenCalledWith(x, y);
    expect(moveMainCommand.execute).toHaveBeenCalledOnce();
  });
});
