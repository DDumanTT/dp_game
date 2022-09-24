import "./styles.css";
import * as PIXI from "pixi.js";
import config from "./config";

window.onload = () => {
  const app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: 0xffffff,
  });

  app.ticker.maxFPS = config.performance.fps;
  document.body.appendChild(app.view);
};
