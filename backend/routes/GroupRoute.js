import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { createGroup } from "../controllers/GroupController.js";

const groupRoutes = Router();

groupRoutes.post("/creategroup", verifyToken, createGroup);

export default groupRoutes;
