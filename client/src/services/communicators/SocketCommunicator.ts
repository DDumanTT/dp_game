import { SOCKET_UPDATE_PICKUP } from "./../../../../shared/constants/SocketConstants";
import {
  SOCKET_GET_PICKUPS,
  SOCKET_SET_PICKUPS,
} from "@shared/constants/SocketConstants";
import { io as socketIO, Socket } from "socket.io-client";

import CommunicatorBase from "../../core/base/CommunicatorBase";

import {
  SOCKET_GET_CURRENT_PLAYERS,
  SOCKET_SPAWN_PLAYER,
  SOCKET_UPDATE_POSITIONS,
  SOCKET_UPDATE_USER_POS,
} from "@shared/constants/SocketConstants";

import SocketPickup from "@shared/contracts/SocketPickup";
import SocketPlayer from "@shared/contracts/SocketPlayer";
import SocketPosition from "@shared/contracts/SocketPosition";
import IGameManager from "../../core/interfaces/IGameManager";
import EntityService from "../EntityService";
import Player from "../../components/Player";

export default class SocketCommunicator extends CommunicatorBase {
  private _socket: Socket = socketIO(this.uri, { query: { name: this.name } });

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
    this._socket.on(SOCKET_UPDATE_POSITIONS, this.updatePositions.bind(this));
    this._socket.on(SOCKET_UPDATE_PICKUP, this.updatePickup.bind(this));

    this._socket.once(
      SOCKET_GET_CURRENT_PLAYERS,
      this.addCurrentPlayers.bind(this)
    );
    this._socket.once(SOCKET_GET_PICKUPS, this.getPickups.bind(this));
  }

  public sendPlayerPosition(player: Player) {
    const socketPlayer = new SocketPlayer();
    socketPlayer.id = player.id;
    socketPlayer.name = player.name;
    socketPlayer.position = new SocketPosition();
    socketPlayer.position.x = player.targetPosition.x;
    socketPlayer.position.y = player.targetPosition.y;
    this._socket.emit(SOCKET_UPDATE_USER_POS, socketPlayer);
  }

  // Listeners ----------------------------------

  private connect() {
    console.log("connected");
  }

  private updatePositions(players: Record<string, SocketPlayer>) {
    const entityService = this.gameManager.getService(EntityService);
    entityService.updatePositions(players);
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
}
