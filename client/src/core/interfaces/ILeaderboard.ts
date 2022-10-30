import ILeaderboardUser from "./ILeaderboardUser";

export default interface ILeaderBoard {
  players(): Array<ILeaderboardUser>;
}
