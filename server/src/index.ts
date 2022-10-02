const express = require("express");
const sockets = require("socket.io");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || false;

const app = express();
const server = app.listen(PORT);

import { SOCKET_UPDATE_POSITIONS, SOCKET_SPAWN_PLAYER, SOCKET_UPDATE_USER_POS } from "@shared/constants/SocketConstants";
import SocketPlayer from "@shared/contracts/SocketPlayer";
import PlayerService from './services/PlayerService';

const io = new sockets.Server(server, { cors: { origin: "*" } });

if (NODE_ENV == "production") {
  app.use(express.static("public"));
  app.get("/", (req, res) => res.sendFile("index.html"));
}

const playerService = PlayerService.getInstance();

// Gets only connected player
io.on("connection", (socket) => {
  console.log(`connected: ${socket.id}`);
  socket.on("disconnect", () => {
    playerService.removePlayerById(socket.id);
    console.log(`disconnected: ${socket.id}`);
    // socket.broadcast.emit("disconnected", socket.id);
  });

  // TODO to update user position
  socket.on(SOCKET_UPDATE_USER_POS, playerService.updatePlayerPosition.bind(playerService));

  

  // Emits new player to others
  const spawnedPlayer = playerService.spawnPlayer(socket.id);
  socket.emit(SOCKET_SPAWN_PLAYER, spawnedPlayer);
  // socket.broadcast.emit("new-player", player, players);
});


// emits all players positions
setInterval(() => {
  io.emit(SOCKET_UPDATE_POSITIONS, playerService.players);
}, 16);
