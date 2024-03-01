import amqplib from "amqplib";
import dotenv from "dotenv";
import { updateConsumerChannel } from "./invoice/infraestructure/UpdateHandler";

dotenv.config();

(async () => {
  const connection = await amqplib.connect(process.env["BROKER_URI"] || "");

  const ch1 = await connection.createChannel();
  await ch1.assertQueue(process.env["BROKER_CHANNEL"] || "");

  updateConsumerChannel(ch1, process.env["BROKER_CHANNEL"] || "");
})();
