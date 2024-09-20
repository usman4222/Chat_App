import { Router } from "express";
import { getUserData } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const userRoutes = Router()

userRoutes.get("/userdata", verifyToken, getUserData)

export default userRoutes

