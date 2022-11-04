// Kinda useless for now

import MainPlayer from "../../components/MainPlayer";

export default class MainPlayerColourDecorator extends MainPlayer {
  decoratedPlayer: MainPlayer;

  constructor(player: MainPlayer) {
    super(player);
    this.decoratedPlayer = player;
  }

  set color(value: number) {
    this.decoratedPlayer.color = value;
  }
}
