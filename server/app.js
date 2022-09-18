const express = require("express");
const sockets = require("socket.io");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || false;

const app = express();
const server = app.listen(PORT);

const io = new sockets.Server(server, { cors: { origin: "*" } });

if (NODE_ENV == "production") {
  app.use(express.static("public"));
  app.get("/", (req, res) => res.sendFile("index.html"));
}

io.on("connection", (socket) => {
  io.emit("lole");
});
