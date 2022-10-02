import { io as socketIO, Socket } from "socket.io-client";

import CommunicatorBase from "../../core/base/CommunicatorBase";

import {
  SOCKET_SPAWN_PLAYER,
  SOCKET_UPDATE_POSITIONS,
  SOCKET_UPDATE_USER_POS,
} from "@shared/constants/SocketConstants";

import SocketPlayer from "@shared/contracts/SocketPlayer";
import { Application } from "pixi.js";

export default class SocketCommunicator extends CommunicatorBase {
  private _socket: Socket = socketIO(this.uri);

  private _players: SocketPlayer[] = [];
  public get players(): SocketPlayer[] {
    return this._players;
  }

  private _playerId: string | undefined;
  public get currentPlayerId(): string | undefined {
    return this._playerId;
  }

  public execute(_app: Application) {
    this._socket.on("connect", this.connect.bind(this));
    this._socket.on(SOCKET_UPDATE_POSITIONS, this.updatePositions.bind(this));
    this._socket.on(SOCKET_SPAWN_PLAYER, this.spawnPlayer.bind(this));
  }

  public sendPlayerPosition(player: SocketPlayer) {
    this._socket.emit(SOCKET_UPDATE_USER_POS, player);
  }

  // Listeners ----------------------------------

  private connect() {
    this._playerId = this._socket.id;
  }

  private updatePositions(players: SocketPlayer[]) {
    this._players = players;
  }

  private spawnPlayer() {}

  // ---------------------------------------------
}
