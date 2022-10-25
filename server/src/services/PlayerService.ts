import SocketPlayer from "@shared/contracts/SocketPlayer";
import Position from "@shared/contracts/SocketPosition";
import config from "@shared/config";

export default class PlayerService {
  private static _playersService = new PlayerService();
  private _players: SocketPlayer[] = [];

  private constructor() {}

  public static getInstance() {
    return PlayerService._playersService;
  }

  public get players(): SocketPlayer[] {
    return this._players;
  }

  private generatePosition(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public spawnPlayer(socketId: string, name: string) {
    let player: SocketPlayer = {
      name,
      id: socketId,
      size: 50,
      position: {
        x: this.generatePosition(0, config.world.width),
        y: this.generatePosition(0, config.world.height),
      },
    };
    console.log(player.position.x);
    console.log(player.position.y);
    this.addPlayer(player);
    return player;
  }

  private addPlayer(player: SocketPlayer): void {
    this._players.push(player);
  }

  public removePlayerById(id: string): void {
    this._players = this._players.filter((p) => p.id !== id);
  }

  public updatePlayerPosition(player: SocketPlayer) {
    const currentPlayer = this._players.find((p) => p.id === player.id);
    if (currentPlayer == undefined || currentPlayer == null) {
      return;
    }
    // for testing...
    // console.log(currentPlayer.position);
    currentPlayer.position = player.position;
    currentPlayer.size = player.size;
  }

  public getPlayerPositions() {
    const players: Record<string, SocketPlayer> = {};
    this._players.forEach((p) => {
      players[p.id] = p;
    });
    return players;
  }

  public getPlayers() {
    return this._players;
  }
}
