import Player from "../../components/Player";
import Position from "../../components/Position";

export default interface IPickup {
  get position(): Position;
  get id(): number;
  activate(player: Player): void;
  destroy(): void;
}
