import SocketPlayer from "@shared/contracts/SocketPlayer";

export default interface IPlayerService {
    addPlayer(player: SocketPlayer): void;
}