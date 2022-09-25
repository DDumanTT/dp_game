import "./styles.css";
import config from "./config";

import { Application } from "pixi.js";
import GameManager from "./GameManager";
import GameManagerBuilder from "./core/GameManagerBuilder";
import SocketCommunicator from "./services/communicators/SocketCommunicator";
import DefaultLevel from "./levels/DefaultLevel";

window.onload = () => {
  const app = new Application({
    resizeTo: window,
    backgroundColor: 0xffffff,
  });

  app.ticker.maxFPS = config.performance.fps;
  document.body.appendChild(app.view);

  const gameManagerBuilder = new GameManagerBuilder(app);
  gameManagerBuilder.addAutoService(new SocketCommunicator(config.communicators.sockets));
  const gameManager = gameManagerBuilder.build();

  // TODO: implement level picker service
  const defaultLevel = new DefaultLevel(gameManager);
  // const gameManager = new GameManager(gameManagerBuilder);
  // gameManager.loadAssets(app.loader);

  // app.loader.load(gameManager.loadSprites.bind(gameManager));
  // app.loader.onComplete.add(gameManager.gameStart.bind(gameManager));
};

