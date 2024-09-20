import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getUserData, updateUserProfile } from "../controllers/UserController.js";

const userRoutes = Router()

userRoutes.get("/userdata", verifyToken, getUserData)
userRoutes.post("/updateprofile", verifyToken, updateUserProfile)

export default userRoutes

