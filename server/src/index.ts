const express = require("express");
const sockets = require("socket.io");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || false;

const app = express();
const server = app.listen(PORT);

import config from "@shared/config";
import {
  SOCKET_SPAWN_PLAYER,
  SOCKET_UPDATE_USER_POS,
  SOCKET_GET_CURRENT_PLAYERS,
  SOCKET_GET_PICKUPS,
  SOCKET_SET_PICKUPS,
  SOCKET_UPDATE_PICKUP,
  SOCKET_UPDATE_PLAYERS,
  SOCKET_REMOVE_PLAYER,
} from "@shared/constants/SocketConstants";
import PickupService from "./services/PickupService";
import PlayerService from "./services/PlayerService";

const io = new sockets.Server(server, { cors: { origin: "*" } });

// if (NODE_ENV == "production") {
app.use(express.static("public"));
app.get("/", (req, res) => res.sendFile("./index.html"));
// }

const playerService = PlayerService.getInstance();
const pickupService = PickupService.getInstance();

// Gets only connected player
io.on("connection", (socket) => {
  const playerName = socket.handshake.query.name;
  console.log(`connected: ${socket.id}, name: ${playerName}`);
  socket.on("disconnect", () => {
    playerService.removePlayerById(socket.id);
    console.log(`disconnected: ${socket.id}, name: ${playerName}`);
    // socket.broadcast.emit("disconnected", socket.id);
  });

  // TODO to update user position
  socket.on(
    SOCKET_UPDATE_USER_POS,
    playerService.updatePlayerPosition.bind(playerService)
  );

  // Emits new player to others
  const spawnedPlayer = playerService.spawnPlayer(socket.id, playerName);
  socket.emit(SOCKET_SPAWN_PLAYER, spawnedPlayer);
  socket.broadcast.emit(SOCKET_SPAWN_PLAYER, spawnedPlayer);

  socket.emit(SOCKET_GET_CURRENT_PLAYERS, playerService.getPlayers());
  socket.emit(SOCKET_GET_PICKUPS, pickupService.pickups);
  socket.on(SOCKET_SET_PICKUPS, (id: number) => {
    const newPickup = pickupService.consumePickup(id);
    io.emit(SOCKET_UPDATE_PICKUP, newPickup);
  });
  socket.on(
    SOCKET_REMOVE_PLAYER,
    playerService.removePlayerById.bind(playerService)
  );
});

// emits all players positions
setInterval(() => {
  io.emit(SOCKET_UPDATE_PLAYERS, playerService.getPlayerPositions());
}, config.performance.refreshTime);

console.log("Server started");
