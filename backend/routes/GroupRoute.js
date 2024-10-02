import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { createGroup, getAllGroups, getGroupMessages } from "../controllers/GroupController.js";

const groupRoutes = Router();

groupRoutes.post("/creategroup", verifyToken, createGroup);
groupRoutes.get("/getallgroups", verifyToken, getAllGroups);
groupRoutes.get("/getgroupmessages/:groupId", verifyToken, getGroupMessages);

export default groupRoutes;
