import LeaderBoardStyle, { TopPlayersHistory } from "../assets/Leaderboard";
import IAutoService from "../core/interfaces/IAutoService";
import IGameManager from "../core/interfaces/IGameManager";
import ILeaderboardUser from "../core/interfaces/ILeaderboardUser";
import EntityService from "./EntityService";

import LeaderBoardAdapter from "../core/adapter/LeaderBoardAdapter";
import Entities from "../core/adapter/Entities";
import { LeaderBoardState } from "../core/state/LeaderBoardState";
import { Caretaker } from "../core/memento/CareTaker";
import { Originator } from "../core/memento/Originator";

export default class LeaderboardService implements IAutoService {
  private _leaderboardContent = "";
  private _leaderboardState = new LeaderBoardState(); //state
  private _originator = new Originator({ username: "test", score: -1 });
  private _cateTaker: Caretaker = new Caretaker(this._originator);
  private _topPlayer: ILeaderboardUser | undefined = undefined;
  private _loop: any;

  constructor() {
    // console.log(`Leaderboard content should be: ${content}`);
    this._loop = setInterval(() => {
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
    // if(mainPlayer == undefined || mainPlayer?.size > 52){

    // Momento Design pattern

    if (this.usersExists(users)) {
      // inserts first player
      const tempTopPlayer = users[0];
      if (this._topPlayer === undefined) { // on game start 
        this._topPlayer = tempTopPlayer;
        this._originator.addTopPlayer(this._topPlayer);
        this._cateTaker.backup();
        // console.log("Saving first top player:");
        // console.log(this._topPlayer);
      } else if (
        this._topPlayer.username === tempTopPlayer.username &&
        this._topPlayer.score != tempTopPlayer.score
      ) {
        // this._originator.addTopPlayer(tempTopPlayer);
        // this._topPlayer = tempTopPlayer;
        // this._originator.addTopPlayer(tempTopPlayer);
        this._cateTaker.undo();
        this._originator.updateScore(tempTopPlayer.score);
        this._cateTaker.backup();
        this._topPlayer = tempTopPlayer;
        // console.log("Updating top player score... Player:");
        // console.log(this._topPlayer);
      } else if (this._topPlayer.username !== tempTopPlayer.username) {
        this._topPlayer = tempTopPlayer;
        this._originator.addTopPlayer(this._topPlayer);
        this._cateTaker.backup(); // returns momento | image of state
        // console.log("New Top player: ");
        // console.log(this._topPlayer);
      }
      if (mainPlayer === undefined) {
        clearInterval(this._loop);
        const topPlayersDiv = document.getElementById(
          "topPlayerHistory"
        ) as HTMLInputElement;

        // TODO maybe use undo here....
        const tempUsers = this._cateTaker.returnList();


        const content = TopPlayersHistory(tempUsers);
        topPlayersDiv.innerHTML = content;
        topPlayersDiv.style.backgroundColor = "aliceblue";
        // this._cateTaker.revertAllList();
      }
    }

    this._leaderboardContent =
      this._leaderboardState.getLeaderboardStyle(users); //state
    const leaderboardElement = document.getElementById(
      "leaderboard"
    ) as HTMLInputElement;

    leaderboardElement.innerHTML = this._leaderboardContent;
  }

  usersExists(users: Array<ILeaderboardUser>): boolean {
    return users.length === 0 ? false : true;
  }
}
