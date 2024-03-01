import amqplib from "amqplib";

export default interface SendNotificationInterface {
  currentConnection: amqplib.Connection | undefined;

  provideChannel: amqplib.Channel | undefined;
  provideChannelName: string;

  init(): Promise<boolean>;
  sendNotification(id: number, user_id: string): string;
}
