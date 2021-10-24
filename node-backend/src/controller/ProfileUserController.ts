import { Request, response, Response } from "express";
import ProfileUserService from "../services/ProfileUserService";

export default class ProfileUserController {
  async handle(req: Request, res: Response): Promise<any> {
    const { user_id } = req;
    const service = new ProfileUserService();
    const result = await service.execute(user_id);

    return res.json(result);
  }
}
