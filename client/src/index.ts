import "./styles.css";
import config from "@shared/config";

import { Application } from "pixi.js";
import GameManagerBuilder from "./core/GameManagerBuilder";
import SocketCommunicator from "./services/communicators/SocketCommunicator";
import DefaultLevel from "./levels/DefaultLevel";

import "./extensions/NumberExtensions";
import Game from "./core/Game";
import FirstLevel from "./levels/FirstLevel";
import MainMenu from "./assets/MainMenu";

window.onload = () => {
  const app = new Application({
    resizeTo: window,
    backgroundColor: 0x000000,
  });

  app.ticker.maxFPS = config.performance.fps;
  document.body.appendChild(app.view);

  const gameManagerBuilder = new GameManagerBuilder(app);
  gameManagerBuilder.addAutoService(
    new SocketCommunicator(config.communicators.sockets)
  );

  const gameManager = gameManagerBuilder.build();

  // const game = new Game(gameManager, new FirstLevel());

  // Menu test
  // const menu = document.getElementById("menu");
  // if (menu) menu.innerHTML = MainMenu;

  // TODO: implement level picker service
  const defaultLevel = new DefaultLevel(gameManager);
  // const gameManager = new GameManager(gameManagerBuilder);
  // gameManager.loadAssets(app.loader);

  // app.loader.load(gameManager.loadSprites.bind(gameManager));
  // app.loader.onComplete.add(gameManager.gameStart.bind(gameManager));
};
