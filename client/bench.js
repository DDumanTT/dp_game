// eslint-disable-next-line @typescript-eslint/no-var-requires
const { io } = require("socket.io-client");

const URL = "http://localhost:3000";
const MAX_CLIENTS = 1000;
const CLIENT_CREATION_INTERVAL_IN_MS = 10;
const EMIT_INTERVAL_IN_MS = 1000;

let clientCount = 0;
let responseTimeSum = 0;
let lastReport = new Date().getTime();
let packetsSinceLastReport = 0;

const createClient = () => {
  const socket = io(URL);

  let now;

  setInterval(() => {
    now = new Date().getTime();
    socket.emit("client to server event");
  }, EMIT_INTERVAL_IN_MS);

  socket.on("server to client event", () => {
    packetsSinceLastReport++;
    responseTimeSum += (new Date().getTime() - now) / 1000;
  });

  socket.on("disconnect", (reason) => {
    console.log(`disconnect due to ${reason}`);
  });

  if (++clientCount < MAX_CLIENTS) {
    setTimeout(createClient, CLIENT_CREATION_INTERVAL_IN_MS);
  }
};

createClient();

const printReport = () => {
  const now = new Date().getTime();
  const durationSinceLastReport = (now - lastReport) / 1000;
  const packetsPerSeconds = (
    packetsSinceLastReport / durationSinceLastReport
  ).toFixed(2);
  const avgResponseTime = (
    responseTimeSum / packetsSinceLastReport
  ).toFixed(2);


  console.log(
    `client count: ${clientCount}; average packets received per second: ${packetsPerSeconds}; average response time: ${avgResponseTime}`
  );

  packetsSinceLastReport = 0;
  responseTimeSum = 0;
  lastReport = now;
};

setInterval(printReport, 5000);