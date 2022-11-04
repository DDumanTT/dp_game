import MainPlayer from "../../components/MainPlayer";
import SocketCommunicator from "../../services/communicators/SocketCommunicator";
import EntityService from "../../services/EntityService";
import ICommand from "../interfaces/ICommand";
import IEntity from "../interfaces/IEntity";

export default class ConsumeCommand implements ICommand {
  private _player: MainPlayer;

  constructor(player: MainPlayer) {
    this._player = player;
  }

  execute(player: IEntity) {
    this._player.size += player.size;
    const entityService = this._player.gameManager.getService(EntityService);
    entityService.removeEntity(player);
    const socket = this._player.gameManager.getService(SocketCommunicator);
    socket.removePlayer(player.id);
  }

  undo(...args: any[]) {}
}
