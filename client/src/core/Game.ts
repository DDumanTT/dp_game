import config from "@shared/config";
import SocketPlayer from "@shared/contracts/SocketPlayer";
import { Container, Graphics } from "pixi.js";
import MainPlayer from "../components/MainPlayer";
import Position from "../components/Position";
import SocketCommunicator from "../services/communicators/SocketCommunicator";
import LevelPickerService from "../services/LevelPickerService";
import EntityService from "../services/EntityService";
import GameLoopBase from "./base/GameLoopBase";
import IGameManager from "./interfaces/IGameManager";

export default class Game extends GameLoopBase {
  constructor(gameManager: IGameManager) {
    super(gameManager);
  }

  public start(): void {
    document.body.appendChild(this.gameManager.app.view);

    // const entityService = this.gameManager.getService(EntityService);

    const levelPicker = this.gameManager.getService(LevelPickerService);
    levelPicker.loadLevel(this.setupUpdate.bind(this), this.gameManager.app);
  }

  public update(delta: number): void {
    const entityService = this.gameManager.getService(EntityService);
    entityService.entities.forEach((e) => {
      e.update(delta);
    });
  }
}
