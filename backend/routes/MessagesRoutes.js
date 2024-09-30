import { Router } from "express";
import { getMessages, uploadFile } from "../controllers/MessagesController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const messagesRoutes = Router()
const upload = multer({ dest: "uploads/files" })

messagesRoutes.post("/getmessages", verifyToken, getMessages)
messagesRoutes.post("/uploadfile", verifyToken, upload.single("file"), uploadFile)

export default messagesRoutes

