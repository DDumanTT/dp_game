import { io as socketIO, Socket } from "socket.io-client";

import CommunicatorBase from "../../core/base/CommunicatorBase";

import {
  SOCKET_GET_CURRENT_PLAYERS,
  SOCKET_SPAWN_PLAYER,
  SOCKET_UPDATE_USER_POS,
  SOCKET_UPDATE_PLAYERS,
  SOCKET_UPDATE_PICKUP,
  SOCKET_GET_PICKUPS,
  SOCKET_SET_PICKUPS,
  SOCKET_REMOVE_PLAYER,
} from "@shared/constants/SocketConstants";

import SocketPickup from "@shared/contracts/SocketPickup";
import SocketPlayer from "@shared/contracts/SocketPlayer";
import SocketPosition from "@shared/contracts/SocketPosition";
import IGameManager from "../../core/interfaces/IGameManager";
import EntityService from "../EntityService";
import Player from "../../components/Player";
import IEntity from "../../core/interfaces/IEntity";

export default class SocketCommunicator extends CommunicatorBase {
  private _socket: Socket = socketIO(
    import.meta.env.DEV ? this.uri : import.meta.env.VITE_SERVER_URL,
    { query: { name: this.name } }
  );

  private _players: SocketPlayer[] = [];
  public get players(): SocketPlayer[] {
    return this._players;
  }

  private _playerId: string | undefined;
  public get currentPlayerId(): string | undefined {
    return this._playerId;
  }

  private _mainPlayer: SocketPlayer | undefined;
  public get mainPlayer(): SocketPlayer | undefined {
    return this._mainPlayer;
  }

  public execute(gameManager: IGameManager) {
    this.gameManager = gameManager;
    this._socket.on("connect", this.connect.bind(this));
    this._socket.on(SOCKET_SPAWN_PLAYER, this.spawnPlayer.bind(this));
    this._socket.on(SOCKET_UPDATE_PLAYERS, this.updatePlayers.bind(this));
    this._socket.on(SOCKET_UPDATE_PICKUP, this.updatePickup.bind(this));

    this._socket.once(
      SOCKET_GET_CURRENT_PLAYERS,
      this.addCurrentPlayers.bind(this)
    );
    this._socket.once(SOCKET_GET_PICKUPS, this.getPickups.bind(this));

    this._socket.on("error", (err) => {
      console.log(err); // prints the message associated with the error
    });
  }

  public sendPlayerPosition(player: IEntity) {
    const socketPlayer = new SocketPlayer();
    socketPlayer.id = player.id;
    socketPlayer.name = player.name;
    socketPlayer.size = player.size;
    socketPlayer.position = new SocketPosition();
    socketPlayer.position.x = player.targetPosition.x;
    socketPlayer.position.y = player.targetPosition.y;
    this._socket.emit(SOCKET_UPDATE_USER_POS, socketPlayer);
  }

  // Listeners ----------------------------------

  private connect() {
    console.log("connected");
  }

  private updatePlayers(players: Record<string, SocketPlayer>) {
    const entityService = this.gameManager.getService(EntityService);
    entityService.updatePlayers(players);
  }

  private spawnPlayer(player: SocketPlayer) {
    const entityService = this.gameManager.getService(EntityService);
    entityService.spawnPlayer(player);
  }

  private addCurrentPlayers(players: SocketPlayer[]) {
    const entityService = this.gameManager.getService(EntityService);
    entityService.addCurrentPlayers(players);
  }

  private getPickups(pickups: SocketPickup[]) {
    const entityService = this.gameManager.getService(EntityService);
    entityService.spawnPickups(pickups);
  }

  private updatePickup(pickup: SocketPickup) {
    const entityService = this.gameManager.getService(EntityService);
    entityService.updatePickup(pickup);
  }

  // Emitters ----------------------------------

  public emitRemovePickup(id: number) {
    this._socket.emit(SOCKET_SET_PICKUPS, id);
  }

  public removePlayer(id: string) {
    this._socket.emit(SOCKET_REMOVE_PLAYER, id);
  }
}
