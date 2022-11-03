import ILeaderboardUser from "../core/interfaces/ILeaderboardUser";

function div(payload: string): string {
  return `<div>${payload}</div>`;
}

function ul(payload: string): string {
  return `<ul>${payload}</ul>`;
}

function li(payload: string): string {
  return `<li>${payload}</li>`;
}

export default function LeaderBoardStyle(
  users: Array<ILeaderboardUser>
): string {
  // reikia username ir score
  var scoresWithUsernames: string = users
    .map((x, index) => {
      return li(`${index + 1}. ${x.username} ${x.score}`);
    })
    .join("");

  return `${div("Leaderboard:" + div(ul(scoresWithUsernames)))}`;
}