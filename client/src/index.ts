import { io } from "socket.io-client";

const socket = io("http://localhost:3000/");

socket.on("lole", () => {
  console.log(socket.id);
});
