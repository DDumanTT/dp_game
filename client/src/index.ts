import "./styles.css";
import { io } from "socket.io-client";

import * as PIXI from "pixi.js";
import Player from "./components/Player";

const LEVEL_WIDTH = 5000;
const LEVEL_HEIGHT = 5000;

import groundImage from "./assets/textures/ground.jpg";

const socket = io("http://localhost:3000/");
const sprites = {};

let app = new PIXI.Application({ resizeTo: window, backgroundColor: 0xffffff });
document.body.appendChild(app.view);

app.loader.add("ground", groundImage);
app.loader.load(init);

function init(loader, resources) {
  const level = new PIXI.Container();
  // level.x = -LEVEL_HEIGHT / 2;
  // level.y = -LEVEL_WIDTH / 2;

  const sprite = new PIXI.TilingSprite(
    resources.ground.texture,
    LEVEL_HEIGHT,
    LEVEL_WIDTH
  );

  console.log(sprite._textureID);

  level.addChild(sprite);
  app.stage.addChild(level);

  app.view.addEventListener("mousemove", (e: MouseEvent) => {
    // console.log(`x: ${e.clientX}, y: ${e.clientY}`);
  });

  // let canvas_players = [] as Player[];
  let player_id: string = "";
  socket.on("connect", () => {
    console.log(`Connected with id: ${socket.id}`);
    player_id = socket.id;
  });

  let socket_players: SocketPlayer[] = [];

  socket.on("update-positions", (players: SocketPlayer[]) => {
    socket_players = players;
  });

  let pixi_players: Player[] = [];

  let elapsed = 0.0;
  let seconds = 0;
  app.ticker.add((delta) => {
    elapsed += delta;
    seconds += (1 / 60) * delta;

    if (seconds >= 0.5) {
      seconds = 0;

      const connectedPlayers: Player[] = [];

      // TODO: improve speed
      for (const pixi_player of pixi_players) {
        const isPlayerDisconnected =
          socket_players.filter((x) => x.id == pixi_player.id).length == 0;

        if (isPlayerDisconnected) {
          pixi_player.graphics.clear();
          // pixi_player.graphics.destroy();
        }
      }

      for (const socket_player of socket_players) {
        const isPlayerDrawn =
          pixi_players.filter((x) => x.id == socket_player.id).length > 0;

        if (!isPlayerDrawn) {
          const graphics = drawPlayer(level, socket_player);
          const player = new Player(socket_player.id, graphics);
          pixi_players.push(player);
        }
      }
    }
  });

  function drawPlayer(container: PIXI.Container, player: SocketPlayer) {
    const obj = new PIXI.Graphics();
    obj.beginFill(0xff0000);
    obj.drawCircle(player.position.x, player.position.y, 50);
    container.addChild(obj);
    return obj;
  }
}
