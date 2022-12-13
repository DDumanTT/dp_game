import ILeaderboardUser from "../core/interfaces/ILeaderboardUser";

function div(payload: string): string {
  return `<div>${payload}</div>`;
}

function ul(payload: string): string {
  return `<ul>${payload}</ul>`;
}

function li(payload: string): string {
  return `${payload}<br/>`;
}

export default function LeaderBoardStyle(
  users: Array<ILeaderboardUser>
): string {
  // reikia username ir score
  const scoresWithUsernames: string = users
    .map((x, index) => {
      return li(`${index + 1}. ${x.username} ${x.score}`);
    })
    .join("");

  return `${div("Leaderboard:" + div(ul(scoresWithUsernames)))}`;
}

export function TopPlayersHistory(users: Array<string>): string {
  // reikia username ir score
  const scoresWithUsernames: string = users
    .map((x) => {
      return div(`${x}`);
    })
    .join("");

  return `${div("GAME OVER" +div("History of Top players during your session:" + div(ul(scoresWithUsernames))))}`;
}

export class LeaderBoardHelper {
  constructor() {}

  addUl(payload: string): string {
    return `<ul>${payload}</ul>`;
  }

  addLi(payload: string): string {
    return `${payload}<br/>`;
  }

  addDiv(payload: string): string {
    return `<div>${payload}</div>`;
  }

  createPredefinedContent(users: Array<ILeaderboardUser>): string {
    // reikia username ir score
    var scoresWithUsernames: string = users
      .map((x, index) => {
        return li(`${index + 1}. ${x.username} ${x.score}`);
      })
      .join("");

    return `${div("Leaderboard:" + div(ul(scoresWithUsernames)))}`;
  }
}
