import LeaderBoardStyle from "../assets/Leaderboard";
import IAutoService from "../core/interfaces/IAutoService";
import IGameManager from "../core/interfaces/IGameManager";
import ILeaderboardUser from "../core/interfaces/ILeaderboardUser";
import EntityService from "./EntityService";

import LeaderBoardAdapter from "../core/adapter/LeaderBoardAdapter";
import Entities from "../core/adapter/Entities";

export default class LeaderboardService implements IAutoService {
  private _leaderboardContent = "";

  constructor() {
    // console.log(`Leaderboard content should be: ${content}`);
    setInterval(() => {
      this.update();
    }, 1000 / 5); // refreshes 5 times per second
  }

  private _gameManager: IGameManager = null!;
  execute(gameManager: IGameManager) {
    this._gameManager = gameManager;
    console.log("LeaderboardService created...");
  }

  update() {
    if (this._gameManager == null) {
      return;
    }
    var entityService = this._gameManager.getService(EntityService);

    // pass entities to adapter
    var entities = new Entities(entityService.entities);
    var adapter = new LeaderBoardAdapter(entities.entities());
    var users = adapter.players();

    users.sort((a: ILeaderboardUser, b: ILeaderboardUser) => b.score - a.score);
    users = users.slice(0, 10);

    var content = LeaderBoardStyle(users);
    this._leaderboardContent = content;
    var leaderboardElement = document.getElementById(
      "leaderboard"
    ) as HTMLInputElement;

    leaderboardElement.innerHTML = content;
  }
}
