import config from "@shared/config";
import { Application } from "pixi.js";
import SocketCommunicator from "../../services/communicators/SocketCommunicator";
import EntityService from "../../services/EntityService";
import LeaderboardService from "../../services/LeaderboardService";
import LevelPickerService from "../../services/LevelPickerService";
import PlayerDistanceService from "../../services/PlayerDistanceServer";
import Game from "../Game";
import GameManagerBuilder from "../GameManagerBuilder";

export class GameFacade {
  static StartGame(playerName: string, color: number) {
    GameFacade.hideMenu();

    const app = new Application({
      resizeTo: window,
      backgroundColor: 0x000000,
    });

    app.ticker.maxFPS = config.performance.fps;

    const gameManagerBuilder = new GameManagerBuilder(app);
    gameManagerBuilder.addAutoService(
      new SocketCommunicator(config.communicators.sockets, playerName, color)
    );
    gameManagerBuilder.addService(Game);
    gameManagerBuilder.addAutoService(new LevelPickerService());
    gameManagerBuilder.addAutoService(new EntityService());
    gameManagerBuilder.addAutoService(new LeaderboardService());
    gameManagerBuilder.addAutoService(new PlayerDistanceService());

    const gameManager = gameManagerBuilder.build();
    const game = gameManager.getService(Game);
    gameManager.app.ticker.add((delta: number) => {
      game.notifyObservers(delta);
    });

    game.start();
  }

  protected static hideMenu() {
    const menu = document.getElementById("menu");
    menu?.classList.add("hidden");
  }
}
