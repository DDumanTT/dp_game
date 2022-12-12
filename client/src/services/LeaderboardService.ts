import LeaderBoardStyle from "../assets/Leaderboard";
import IAutoService from "../core/interfaces/IAutoService";
import IGameManager from "../core/interfaces/IGameManager";
import ILeaderboardUser from "../core/interfaces/ILeaderboardUser";
import EntityService from "./EntityService";

import LeaderBoardAdapter from "../core/adapter/LeaderBoardAdapter";
import Entities from "../core/adapter/Entities";
import { LeaderBoardState } from "../core/state/LeaderBoardState";
import { Caretaker } from "../core/momento/CareTaker";
import { Originator } from "../core/momento/Originator";

export default class LeaderboardService implements IAutoService {
  private _leaderboardContent = "";
  private _leaderboardState = new LeaderBoardState(); //state
  private _originator = new Originator({username: 'test', score: -1})
  private _cateTaker: Caretaker = new Caretaker(this._originator);

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
    const entityService = this._gameManager.getService(EntityService);

    // pass entities to adapter
    const entities = new Entities(entityService.entities);
    const adapter = new LeaderBoardAdapter(entities.entities());
    let users = adapter.players();

    users.sort((a: ILeaderboardUser, b: ILeaderboardUser) => b.score - a.score);
    users = users.slice(0, 10);


    const mainPlayer = entityService.mainPlayer;


    // TODO use caretaker
    if(mainPlayer == undefined || mainPlayer?.size > 52){
      mainPlayer?.destroy();
    }

    // TODO implement logics
    // this._originator.addTopPlayer();

    // const mainPlayer_2 = entityService.mainPlayer;

    // if (mainPlayer_2 === null) { // TODO on deleted check if user 
    //   console.log("User is dead");
    // }



    this._leaderboardContent =
      this._leaderboardState.getLeaderboardStyle(users); //state
    const leaderboardElement = document.getElementById(
      "leaderboard"
    ) as HTMLInputElement;

    leaderboardElement.innerHTML = this._leaderboardContent;
  }
}
