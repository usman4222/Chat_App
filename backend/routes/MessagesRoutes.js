import { Router } from "express";
import { getMessages } from "../controllers/MessagesController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const messagesRoutes = Router()

messagesRoutes.post("/getmessages", verifyToken, getMessages)

export default messagesRoutes

