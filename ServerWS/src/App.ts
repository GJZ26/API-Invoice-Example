import http from "http";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";

dotenv.config();

const APP_PORT = process.env["APP_PORT"] || 3032;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  },
});

server.listen(APP_PORT, ()=>{
    console.log("Server WebSocket is now listening on port: " + APP_PORT);
})