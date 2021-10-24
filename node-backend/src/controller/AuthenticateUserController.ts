import { Request, Response } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

export default class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<object | string> {
    const { code } = req.body;
    const service = new AuthenticateUserService();

    try {
      const result = await service.execute(code);
      return res.json(result);
    } catch (err) {
      return res.json(err.message);
    }
  }
}
