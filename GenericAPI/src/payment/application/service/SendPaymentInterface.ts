import amqplib from "amqplib";

export default interface SendPaymentInterface {
  currentConnection: amqplib.Connection | undefined;

  provideChannel: amqplib.Channel | undefined;
  provideChannelName: string;

  init(): Promise<boolean>;
  sendPayment(
    id: string,
    user_id: string,
    amount: number,
    concept: string
  ): string;
}
