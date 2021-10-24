import { Router } from "express";
import AuthenticateUserController from "./controller/AuthenticateUserController";
import CreateMessageController from "./controller/CreateMessageController";
import Get3LastMessagesController from "./controller/GetLast3MessagesController";
import ProfileUserController from "./controller/ProfileUserController";
import ensureAuth from "./middleware/ensureAuth";

export const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/messages", ensureAuth, new CreateMessageController().handle);

router.get("/messages/last3", new Get3LastMessagesController().handle);

router.get("/profile", ensureAuth, new ProfileUserController().handle);
