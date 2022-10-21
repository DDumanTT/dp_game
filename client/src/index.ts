import { Application } from "pixi.js";

import "./extensions/NumberExtensions";
import config from "@shared/config";

import GameManagerBuilder from "./core/GameManagerBuilder";
import Game from "./core/Game";
import SocketCommunicator from "./services/communicators/SocketCommunicator";
import LevelPickerService from "./services/LevelPickerService";
import EntityService from "./services/EntityService";

function hideMenu() {
  const menu = document.getElementById("menu");
  menu?.classList.add("hidden");
}

const input = document.getElementById("name") as HTMLInputElement;
document.getElementById("play")?.addEventListener("click", () => {
  let name = input?.value;
  if (!name) {
    alert("Please input a name");
    return;
  }
  startGame(name);
});

function startGame(playerName: string) {
  hideMenu();

  const app = new Application({
    resizeTo: window,
    backgroundColor: 0x000000,
  });
  app.ticker.maxFPS = config.performance.fps;

  const gameManagerBuilder = new GameManagerBuilder(app);
  gameManagerBuilder.addAutoService(
    new SocketCommunicator(config.communicators.sockets, playerName)
  );
  gameManagerBuilder.addAutoService(new LevelPickerService());
  gameManagerBuilder.addAutoService(new EntityService());

  const gameManager = gameManagerBuilder.build();

  const game = new Game(gameManager);

  game.start();
}

// window.onload = () => {
//   const app = new Application({
//     resizeTo: window,
//     backgroundColor: 0x000000,
//   });

//   app.ticker.maxFPS = config.performance.fps;
//   document.body.appendChild(app.view);

//   const gameManagerBuilder = new GameManagerBuilder(app);
//   gameManagerBuilder.addAutoService(
//     new SocketCommunicator(config.communicators.sockets)
//   );

//   const gameManager = gameManagerBuilder.build();

//   // const game = new Game(gameManager, new FirstLevel());

//   // Menu test
//   // const menu = document.getElementById("menu");
//   // if (menu) menu.innerHTML = MainMenu;

//   // TODO: implement level picker service
//   const defaultLevel = new DefaultLevel(gameManager);
//   // const gameManager = new GameManager(gameManagerBuilder);
//   // gameManager.loadAssets(app.loader);

//   // app.loader.load(gameManager.loadSprites.bind(gameManager));
//   // app.loader.onComplete.add(gameManager.gameStart.bind(gameManager));
// };
