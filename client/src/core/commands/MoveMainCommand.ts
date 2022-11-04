import MainPlayer from "../../components/MainPlayer";
import Position from "../../components/Position";
import SocketCommunicator from "../../services/communicators/SocketCommunicator";
import EntityService from "../../services/EntityService";
import ICommand from "../interfaces/ICommand";
import IEntity from "../interfaces/IEntity";

export default class MoveMainCommand implements ICommand {
  private _player: MainPlayer;

  constructor(player: MainPlayer) {
    this._player = player;
  }

  execute(x: number, y: number) {
    const [newX, newY] = this._player.movementStrategy.move(
      this._player.graphics.position.x,
      this._player.graphics.position.y,
      x,
      y
    );
    this._player.graphics.position.x = newX;
    this._player.graphics.position.y = newY;
    this._player.targetPosition.set(newX, newY);
    const socket = this._player.gameManager.getService(SocketCommunicator);
    socket.sendPlayerPosition(this._player);
    return [newX, newY];
  }

  undo(...args: any[]) {}
}
