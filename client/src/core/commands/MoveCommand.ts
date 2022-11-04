import MainPlayer from "../../components/MainPlayer";
import Player from "../../components/Player";
import Position from "../../components/Position";
import SocketCommunicator from "../../services/communicators/SocketCommunicator";
import EntityService from "../../services/EntityService";
import ICommand from "../interfaces/ICommand";
import IEntity from "../interfaces/IEntity";

export default class MoveCommand implements ICommand {
  private _player: Player;
  private _msElapsed = 0;

  constructor(player: Player) {
    this._player = player;
  }

  execute(x: number, y: number, size: number) {
    this._msElapsed = 0;
    this._player.originPosition.set(
      this._player.targetPosition.x,
      this._player.targetPosition.y
    );
    this._player.targetPosition.set(x, y);
    this._player.size = size;
  }

  undo(...args: any[]) {}
}
