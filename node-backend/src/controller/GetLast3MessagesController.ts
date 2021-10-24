import type { Request, Response } from "express";
import GetLast3MessageService from "../services/GetLast3MessagesService";

export default class Get3LastMessagesController {
  async handle(req: Request, res: Response): Promise<any> {
    const service = new GetLast3MessageService();
    const result = await service.execute();

    return res.json(result);
  }
}
