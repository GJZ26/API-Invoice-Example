import { Request, Response } from "express";
import GetUseCase from "../../application/GetUseCase";

export default class GettController {
  constructor(readonly listUseCase: GetUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const userId = req.headers["userid"] as string;
      const token = req.headers["auth"] as string;

      // Verificar si se proporcionan ambos valores
      if (!userId || !token) {
        return res.status(400).send({
          status: "error",
          data: "Falta el user_id o el token en los encabezados de la solicitud.",
        });
      }

      const records = await this.listUseCase.run(userId, token);

      if (records) {
        return res.status(200).send({
          status: "success",
          data: records,
        });
      }

      return res.status(404).send({
        status: "entry not found",
        data: "No se ha encontrado la entrada solicitada.",
      });
    } catch (error) {
      console.error(error);
      return res.status(204).send({
        status: "error",
        data: "Ha ocurrido un error durante su petición.",
        msg: error,
      });
    }
  }
}
