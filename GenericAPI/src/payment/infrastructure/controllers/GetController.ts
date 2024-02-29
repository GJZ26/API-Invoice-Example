import { Request, Response } from "express";
import GetUseCase from "../../application/GetUseCase";

export default class GettController {
  constructor(readonly listUseCase: GetUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;

    try {
      const records = await this.listUseCase.run(data.user_id, data.token);

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
