import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { addProfileImage, delProfileImage, getUserData, updateUserProfile } from "../controllers/UserController.js";
import multer from "multer"

const userRoutes = Router()
const upload = multer({dest:"uploads/profiles/"})

userRoutes.get("/userdata", verifyToken, getUserData)
userRoutes.post("/updateprofile", verifyToken, updateUserProfile)
userRoutes.post("/profileimage", verifyToken, upload.single("profileImage"), addProfileImage)
userRoutes.delete("/deleteimage", verifyToken, delProfileImage)

export default userRoutes

 