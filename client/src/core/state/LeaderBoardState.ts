/*
State class is used in Leaderbaord to decide if recreate leaderboard
*/

import LeaderBoardStyle from "../../assets/Leaderboard";
import ILeaderboardUser from "../interfaces/ILeaderboardUser";

export const State = {
  STABLE: "STABLE",
  CHANGED: "CHANGED",
};

export class LeaderBoardState {
  private _state = "";
  private _players: Array<ILeaderboardUser> = [];
  private _leaderboardContent = '' as string;

  constructor() {
    console.log("State obj created;...");
  }

  checkState(players: Array<ILeaderboardUser>) {
    // first check if...
    if (this._players.length != players.length) {
      this.setStateChanged(players);
      return;
    } else {
      for (let i = 0; i < players.length; i++) {
        try{
            if(!this.equals(players[i], this._players[i])){
                this.setStateChanged(players);
                return;
            }
        } catch(e){
            this.setStateChanged(players);
            return;
        }
      }
    }
  }

  setStateChanged(players: Array<ILeaderboardUser>){
    this._state = State.CHANGED;
    this._players = players;
  }

  setStateStable(){
    this._state = State.STABLE;
  }

  equals(player1: ILeaderboardUser, player2: ILeaderboardUser):boolean{
    if(player1.username !== player2.username || player1.score !== player2.score){
        return false;
    }
    return true;
  }

  buildLeaderBoard() {
    // Checks state
    switch (this._state) {
      case State.CHANGED:
        // TODO create different state
        this.setStateStable(); // updated state to stable
        this._leaderboardContent = LeaderBoardStyle(this._players);
        console.log("Updating content..");
        return this._leaderboardContent;
      default:
        // if stable, returns old rendered div
        return this._leaderboardContent;
    }
  }

  getLeaderboardStyle(players: Array<ILeaderboardUser>) {
    this.checkState(players);
    return this.buildLeaderBoard();
  }
}
