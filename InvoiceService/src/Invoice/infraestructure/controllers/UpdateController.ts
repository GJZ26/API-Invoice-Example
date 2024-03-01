import UpdateUseCase from "../../application/UpdateUseCase";
import amqp from "amqplib";

export default class UpdateController {
  constructor(readonly updateUseCase: UpdateUseCase) {}

  async run(message: amqp.Message | null, channel: amqp.Channel) {
    if (message === null) {
      console.log("An empty event has been received. Omitting");
      return;
    }
    try {
      const content = message?.content.toString();
      if (!content) {
        console.error("No message content");
        channel.ack(message);
        return;
      }
      const data = JSON.parse(content);
      const userId = data.user_id;
      const id = data.id; 
      const amount = data.amount; 
      console.log("Processing a new payment from user: " + data.user_id);
      const response = await this.updateUseCase.run(userId, id);
      console.log("Payment completed for user:" + data.user_id);

      channel.ack(message);
    } catch (e) {
      console.error(e);
    }
  }
}
