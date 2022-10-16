import Player from "../../components/Player";

export default class PlayerDecorator {
  constructor(public player: Player) {}

  public increaseSize(amount: number) {
    this.player.graphics.scale.x += amount;
    this.player.graphics.scale.y += amount;
  }
}
