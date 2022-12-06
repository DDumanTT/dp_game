import LeaderBoardStyle from "../assets/Leaderboard";
import IAutoService from "../core/interfaces/IAutoService";
import IGameManager from "../core/interfaces/IGameManager";
import ILeaderboardUser from "../core/interfaces/ILeaderboardUser";
import EntityService from "./EntityService";

import LeaderBoardAdapter from "../core/adapter/LeaderBoardAdapter";
import Entities from "../core/adapter/Entities";
import { LeaderBoardState } from "../core/state/LeaderBoardState";

export default class LeaderboardService implements IAutoService {
  private _leaderboardContent = "";
  private _leaderboardState = new LeaderBoardState(); //state

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

    this._leaderboardContent = this._leaderboardState.getLeaderboardStyle(users);//state
    var leaderboardElement = document.getElementById(
      "leaderboard"
    ) as HTMLInputElement;

    leaderboardElement.innerHTML = this._leaderboardContent;
  }
}


