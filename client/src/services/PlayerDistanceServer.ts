import LeaderBoardStyle from "../assets/Leaderboard";
import IAutoService from "../core/interfaces/IAutoService";
import IGameManager from "../core/interfaces/IGameManager";
import IDistanceUser from "../core/interfaces/IDistanceUser";
import EntityService from "./EntityService";
import MainPlayer from '../components/MainPlayer';
import LeaderBoardAdapter from "../core/adapter/LeaderBoardAdapter";
import Entities from "../core/adapter/Entities";
import { DistanceHelper } from "../assets/Distance";
import { AscendingSortedDistances } from './../core/Template/AscendingSortedDistance';
import { DescendingSortedDistances } from './../core/Template/DescendingSortedDistance';

export default class PlayerDistanceService implements IAutoService {
  private _distanceContent = "";

  constructor() {
    // console.log(`Leaderboard content should be: ${content}`);
    setInterval(() => {
      this.update();
    }, 1000 / 10); // refreshes 5 times per second
  }

  private _gameManager: IGameManager = null!;
  execute(gameManager: IGameManager) {
    this._gameManager = gameManager;
    console.log("DistanceService created...");
  }

  update() {
    if (this._gameManager == null) {
      return;
    }

    const entityService = this._gameManager.getService(EntityService);

    const entities = new Entities(entityService.entities);

    const mainPlayer: MainPlayer = entityService.mainPlayer!;

    // const descDistances = new DescendingSortedDistances(mainPlayer, entities.entities());
    
    const ascDistances = new AscendingSortedDistances(mainPlayer, entities.entities());
    ascDistances.templateMethod();
    
    const users = ascDistances.GetConvertedPlayers();

    const content = new DistanceHelper().createPredefinedContent(users);
    this._distanceContent = content;

    const distanceElement = document.getElementById(
      "distance-players"
    ) as HTMLInputElement;

    distanceElement.innerHTML = content;
  }
}
