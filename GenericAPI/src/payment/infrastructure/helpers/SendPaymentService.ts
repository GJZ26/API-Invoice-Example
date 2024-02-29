import amqplib from "amqplib";
import dotenv from "dotenv";
import SendPaymentInterface from "../../application/service/SendPaymentInterface";

dotenv.config();

export default class SendPaymentService implements SendPaymentInterface {
  currentConnection: amqplib.Connection | undefined;
  provideChannel: amqplib.Channel | undefined;
  provideChannelName: string = process.env["BROKER_CHANNEL"] || "";

  async init(): Promise<boolean> {
    try {
      this.currentConnection = await amqplib.connect(
        process.env["BROKER_URI"] ?? ""
      );
      this.provideChannel = await this.currentConnection.createChannel();
      await this.provideChannel.assertQueue(this.provideChannelName);
      return true;
    } catch (e) {
      return false;
    }
  }

  sendPayment(
    id: string,
    user_id: string,
    amount: number,
    concept: string
  ): string {
    if (this.provideChannel === undefined) {
      return "Channel not found.";
    }

    this.provideChannel.sendToQueue(
      this.provideChannelName,
      Buffer.from(
        JSON.stringify({
          id: id,
          user_id: user_id,
          amount: amount,
          concept: concept,
        })
      )
    );

    return "Payment sent!";
  }
}
