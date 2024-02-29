import { updateController } from "./dependencies";
import amqp from 'amqplib'

export const updateConsumerChannel = (
  channel: amqp.Channel,
  channelName: string
) => {
  const callback = updateController.run.bind(updateController);
  channel.consume(channelName, callback);
  console.log(`Listening for messages on channel ${channelName}`);
};
