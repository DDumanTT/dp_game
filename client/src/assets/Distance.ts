import { LeaderBoardHelper } from "./Leaderboard";
import { IDistanceUser } from "../core/interfaces/IDistanceUser";

export class DistanceHelper {
  // leaderboard helper
  private _lbh: LeaderBoardHelper;

  constructor() {
    this._lbh = new LeaderBoardHelper();
  }

  createPredefinedContent(users: Array<IDistanceUser>): string {
    // reikia username ir score
    var scoresWithUsernames: string = users
      .map((x, index) => {
        return this._lbh.addLi(`${index + 1}. ${x.username} ${x.distance}`);
      })
      .join("");

    return `${this._lbh.addDiv(
      "Distances:" + this._lbh.addDiv(this._lbh.addUl(scoresWithUsernames))
    )}`;
  }
}
