/**
 * @vitest-environment jsdom
 */
import config from "@shared/config";
import * as PIXI from "pixi.js-legacy";
import SocketCommunicator from "../../client/src/services/communicators/SocketCommunicator";
import { describe, expect, test } from "vitest";
import { mock } from "vitest-mock-extended";
import Game from "../../client/src/core/Game";
import GameManagerBuilder from "../../client/src/core/GameManagerBuilder";
import EntityService from "../../client/src/services/EntityService";
import LeaderboardService from "../../client/src/services/LeaderboardService";
import LevelPickerService from "../../client/src/services/LevelPickerService";

describe.skip("integration tests", async () => {
  test("leaderboard service returns expected html", async () => {
    const leaderboardElement = document.createElement("div");
    leaderboardElement.id = "leaderboard";
    document.body.appendChild(leaderboardElement);
    const app = new PIXI.Application({ forceCanvas: true });
    const gameManagerBuilder = new GameManagerBuilder(app);
    gameManagerBuilder.addService(Game);
    gameManagerBuilder.addAutoService(new EntityService());
    gameManagerBuilder.addAutoService(new LeaderboardService());

    gameManagerBuilder.build();

    await new Promise((resolve) => setTimeout(resolve, 1500)).then((_) => {
      expect(leaderboardElement.innerHTML).toBe(
        "<div>Leaderboard:<div><ul></ul></div></div>"
      );
    });
  });

  // START BACKEND SERVER (plz)
  test("server returns player spawn coordinates when player connects", async () => {
    const app = new PIXI.Application({ forceCanvas: true });
    const gameManagerBuilder = new GameManagerBuilder(app);
    gameManagerBuilder.addAutoService(
      new SocketCommunicator(config.communicators.sockets, "", 0)
    );
    gameManagerBuilder.addService(Game);
    gameManagerBuilder.addAutoService(new LevelPickerService());
    gameManagerBuilder.addAutoService(new EntityService());
    gameManagerBuilder.addAutoService(new LeaderboardService());

    const gameManager = gameManagerBuilder.build();

    const game = gameManager.getService(Game);

    game.start();

    await new Promise((resolve) => setTimeout(resolve, 1000)).then((_) => {
      const entityService = gameManager.getService(EntityService);
      expect(entityService.mainPlayer).not.toBeNull();
    });
  });
});
