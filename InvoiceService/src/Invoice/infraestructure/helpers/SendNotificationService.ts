import amqplib from "amqplib";
import dotenv from "dotenv";
import SendNotificationInterface from "../../application/services/SendNotificationInterface";

dotenv.config();

export default class SendNotificationService implements SendNotificationInterface {
  currentConnection: amqplib.Connection | undefined;
  provideChannel: amqplib.Channel | undefined;
  provideChannelName: string = process.env["BROKER_CHANNEL_NOTIFICATION"] || "";

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

  sendNotification(
    id: number,
    user_id: string
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
        })
      )
    );

    return "Payment sent!";
  }
}
