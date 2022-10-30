import ILeaderBoard from "../interfaces/ILeaderBoard";
import ILeaderboardUser from "../interfaces/ILeaderboardUser";

export default class Leaderboard implements ILeaderBoard {
  private _leaderboardPlayers: Array<ILeaderboardUser>;

  constructor(leaderboardPlayers: Array<ILeaderboardUser>) {
    this._leaderboardPlayers = leaderboardPlayers;
  }

  players(): Array<ILeaderboardUser> {
    return this._leaderboardPlayers;
  }
}
