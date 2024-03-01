import http from "http";
import dotenv from "dotenv";
import express from "express";
import amqplib from "amqplib";
import { Server, Socket } from "socket.io";

dotenv.config();

const APP_PORT = process.env["APP_PORT"] || 3032;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users: { [key: string]: Socket } = {};

io.on("connect", (socket) => {
  const user_id = socket.handshake.query["userid"];

  if (user_id === undefined || typeof user_id == "object") {
    return socket.disconnect(true);
  }

  users[user_id] = socket;

  socket.on("disconnect", () => {
    if (users[socket.id]) {
      delete users[user_id];
    }
    console.log("Usuari " + user_id + " abandonó.");
  });
});

(async () => {
  const channelName = process.env["BROKER_CHANNEL_NOTIFICATION"] || "";
  const connection = await amqplib.connect(process.env["BROKER_URI"] || "");
  const ch1 = await connection.createChannel();
  await ch1.assertQueue(channelName);

  ch1.consume(channelName, (msg) => {
    if (msg === null) {
      console.log("An empty event has been received. Omitting");
      return;
    }

    const content = msg.content.toString();

    if (!content) {
      console.error("No message content");
      ch1.ack(msg);
      return;
    }

    const info = JSON.parse(content);

    console.log("Getting data: " + content);

    if (users[info.user_id]) {
      users[info.user_id].emit("paynoti", info);
    }else{
      console.log(`User payment processed: ${info.user_id}`)
    }
    ch1.ack(msg);
  });

  console.log(`Listening for messages on channel ${channelName}`);
})();

server.listen(APP_PORT, () => {
  console.log("Server WebSocket is now listening on port: " + APP_PORT);
});
