import ILeaderBoard from "./interfaces/ILeaderBoard";

export default class Leaderboard implements ILeaderBoard {
  public scores: number[];

  constructor(leaderboard: ILeaderBoard) {
    this.scores = leaderboard.scores;
  }
}
