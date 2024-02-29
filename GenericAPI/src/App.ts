import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./user/infrastructure/UserRouter";

dotenv.config();

const APP_PORT = process.env["APP_CORS"] || 3030;

const server = express();

server.use(cors());
server.use(express.json());

server.use("/users", userRouter);

server.listen(APP_PORT, () => {
  console.log("Generic API is now listening on port: " + APP_PORT);
});
