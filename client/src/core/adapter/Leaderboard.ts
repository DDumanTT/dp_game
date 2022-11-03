import ILeaderboard from "../interfaces/ILeaderboard";
import ILeaderboardUser from "../interfaces/ILeaderboardUser";

export default class Leaderboard implements ILeaderboard {
  private _leaderboardPlayers: Array<ILeaderboardUser>;

  constructor(leaderboardPlayers: Array<ILeaderboardUser>) {
    this._leaderboardPlayers = leaderboardPlayers;
  }

  players(): Array<ILeaderboardUser> {
    return this._leaderboardPlayers;
  }
}
