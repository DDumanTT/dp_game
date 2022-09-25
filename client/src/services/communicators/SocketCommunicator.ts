import { io as socketIO, Socket } from "socket.io-client";

import CommunicatorBase from "../../core/base/CommunicatorBase";

import {
  SOCKET_SPAWN_PLAYER,
  SOCKET_UPDATE_POSITIONS,
} from "@shared/constants/SocketConstants";

import SocketPlayer from "@shared/contracts/SocketPlayer";
import { Application } from "pixi.js";

export default class SocketCommunicator extends CommunicatorBase {
  private _socket: Socket = socketIO(this.uri);

  private _players: SocketPlayer[] = [];
  public get players(): SocketPlayer[] {
    return this._players;
  }

  public execute(_app: Application) {
    this._socket.on("connect", this.connect.bind(this));
    this._socket.on(SOCKET_UPDATE_POSITIONS, this.updatePositions.bind(this));
    this._socket.on(SOCKET_SPAWN_PLAYER, this.spawnPlayer.bind(this));
  }

  private connect() {
    console.log(`Connected with id: ${this._socket.id}`);
  }

  private updatePositions(players: SocketPlayer[]) {
    this._players = players;
  }

  private spawnPlayer() {}
}
