/**
 * @vitest-environment jsdom
 */
import * as PIXI from "pixi.js";
import { describe, expect, test } from "vitest";
import GameManagerBuilder from "../src/core/GameManagerBuilder";
import Game from "../src/core/Game";
import EntityService from "../src/services/EntityService";
import LeaderboardService from "../src/services/LeaderboardService";
import { mock } from "vitest-mock-extended";

describe("", () => {
  test("", () => {
    PIXI.settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = false;
    // const app = new PIXI.Application();
    const app = mock<PIXI.Application>();

    const gameManagerBuilder = new GameManagerBuilder(app);
    gameManagerBuilder.addService(Game);
    gameManagerBuilder.addAutoService(new EntityService());
    gameManagerBuilder.addAutoService(new LeaderboardService());

    const gameManager = gameManagerBuilder.build();

    console.log(document.getElementById);

    var leaderboardElement = document.getElementById(
      "leaderboard"
    ) as HTMLInputElement;

    expect(leaderboardElement.innerHTML).toBe(
      "<div>Leaderboard:<div><ul></ul></div></div>"
    );
  });
});
