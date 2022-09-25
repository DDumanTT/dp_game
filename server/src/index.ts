const express = require("express");
const sockets = require("socket.io");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || false;

const app = express();
const server = app.listen(PORT);

import { SOCKET_UPDATE_POSITIONS, SOCKET_SPAWN_PLAYER } from "@shared/constants/SocketConstants";

const io = new sockets.Server(server, { cors: { origin: "*" } });

if (NODE_ENV == "production") {

  app.use(express.static("public"));
  app.get("/", (req, res) => res.sendFile("index.html"));
}

let players = [];

io.on("connection", (socket) => {
  console.log(`connected: ${socket.id}`);
  socket.on("disconnect", () => {
    players = players.filter((p) => p.id !== socket.id);
    console.log(`disconnected: ${socket.id}`);
    // socket.broadcast.emit("disconnected", socket.id);
  });

  let player = {
    id: socket.id,
    position: { x: getRandomInt(0, 1000), y: getRandomInt(0, 1000) },
  };
  players.push(player);
  socket.emit(SOCKET_SPAWN_PLAYER, player);
  // socket.broadcast.emit("new-player", player, players);
});

setInterval(() => {
  io.emit(SOCKET_UPDATE_POSITIONS, players);
}, 500);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
