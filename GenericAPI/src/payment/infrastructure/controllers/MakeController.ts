import { Request, Response } from "express";
import MakeUseCase from "../../application/MakeUseCase";

export default class MakeController {
  constructor(readonly makeUseCase: MakeUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;

    try {
      const records = await this.makeUseCase.run(
        data.token,
        data.user_id,
        data.concept,
        data.amount
      );

      if (records) {
        return res.status(200).send({
          status: "success",
          data: records,
        });
      }
      res.status(500).send({
        status: "internal server error",
        data: "No se ha podido completar tu petición en este instante.",
      });
    } catch (error) {
      console.log(error);
      return res.status(204).send({
        status: "error",
        data: "Ha ocurrido un error durante su petición.",
        msg: error,
      });
    }
  }
}
