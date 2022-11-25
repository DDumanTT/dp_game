import LeaderBoardStyle from "../assets/Leaderboard";
import IAutoService from "../core/interfaces/IAutoService";
import IGameManager from "../core/interfaces/IGameManager";
import IDistanceUser from "../core/interfaces/IDistanceUser";
import EntityService from "./EntityService";
import MainPlayer from '../components/MainPlayer';
import LeaderBoardAdapter from "../core/adapter/LeaderBoardAdapter";
import Entities from "../core/adapter/Entities";
import { DistanceHelper } from "../assets/Distance";

export default class PlayerDistanceService implements IAutoService {
  private _distanceContent = "";

  constructor() {
    // console.log(`Leaderboard content should be: ${content}`);
    setInterval(() => {
      this.update();
    }, 1000 / 5); // refreshes 5 times per second
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
    var entityService = this._gameManager.getService(EntityService);

    var entities = new Entities(entityService.entities);

    const mainPlayer: MainPlayer = entityService.mainPlayer!!;

    var users: Array<IDistanceUser> = entities.entities().map(x => {
      return {
        username: x.name,
        distance: 22
      } as IDistanceUser
    });

    users = users.filter(x => x.username !== mainPlayer.name);

    // users.sort((a: IDistanceUser, b: IDistanceUser) => b.score - a.score);

    var content = new DistanceHelper().createPredefinedContent(users);
    this._distanceContent = content;

    var distanceElement = document.getElementById(
      "distance-players"
    ) as HTMLInputElement;

    distanceElement.innerHTML = content;
  }
}
