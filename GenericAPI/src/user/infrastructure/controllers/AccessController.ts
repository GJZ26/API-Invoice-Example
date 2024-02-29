import { Request, Response } from "express";
import AccessUseCase from "../../application/AccessUseCase";

export default class AccessController {
  constructor(readonly accessUseCase: AccessUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const user = await this.accessUseCase.run(data.email, data.password);
      if (user !== null) {
        return res.status(200).json({
          status: "error",
          data: [user],
          msg: "Autenticación exitosa",
        });
      } else {
        console.log("C");
        res.status(404).send({
          status: "not found",
          data: "No se ha encontrado un usuario las credenciales proporcionadas.",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(204).json({
        status: "error",
        data: [],
        msg: error,
      });
    }
  }
}
