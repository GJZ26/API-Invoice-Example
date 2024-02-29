import UpdateUseCase from "../../application/UpdateUseCase";
import amqp from "amqplib";

export default class UpdateController {
  constructor(readonly updateUseCase: UpdateUseCase) {}

  async run(message: amqp.ConsumeMessage | null) {
    if (message === null) {
      console.log("An empty event has been received. Omitting");
    }
    try {
      const content = message?.content.toString(); // Obtener el contenido del mensaje como cadena
      if (!content) {
        console.error("No message content");
        return;
      }
      const data = JSON.parse(content); // Convertir la cadena JSON a un objeto
      const userId = data.user_id; // Acceder a la propiedad user_id del objeto
      const id = data.id; // Acceder a la propiedad id del objeto

      const response = await this.updateUseCase.run(userId, id);
      console.log("Payment completed:" + response);
    } catch (e) {
      console.error(e);
    }
  }
}
