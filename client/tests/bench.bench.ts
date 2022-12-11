import { bench } from "vitest";
import { io } from "socket.io-client";

bench(
  "1000 clients",
  () => {
    const URL = process.env.URL || "http://localhost:3000";
    const MAX_CLIENTS = 1000;
    const CLIENT_CREATION_INTERVAL_IN_MS = 10;
    const EMIT_INTERVAL_IN_MS = 1000;

    let clientCount = 0;
    let lastReport = new Date().getTime();
    let packetsSinceLastReport = 0;

    const createClient = () => {
      const socket = io(URL);

      setInterval(() => {
        socket.emit("client to server event");
      }, EMIT_INTERVAL_IN_MS);

      socket.on("server to client event", () => {
        packetsSinceLastReport++;
      });

      socket.on("disconnect", (reason) => {
        console.log(`disconnect due to ${reason}`);
      });

      if (++clientCount < MAX_CLIENTS) {
        setTimeout(createClient, CLIENT_CREATION_INTERVAL_IN_MS);
      }
    };

    createClient();

    // const printReport = () => {
    //   const now = new Date().getTime();
    //   const durationSinceLastReport = (now - lastReport) / 1000;
    //   const packetsPerSeconds = (
    //     packetsSinceLastReport / durationSinceLastReport
    //   ).toFixed(2);

    //   console.log(
    //     `client count: ${clientCount} ; average packets received per second: ${packetsPerSeconds}`
    //   );

    //   packetsSinceLastReport = 0;
    //   lastReport = now;
    // };

    // setInterval(printReport, 5000);
  },
  { time: 10000, iterations: 1 }
);
