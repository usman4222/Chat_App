import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { addNewMemberToGroup, createGroup, getAllGroupMembers, getAllGroups, getGroupMessages, removeMemberFromGroup } from "../controllers/GroupController.js";

const groupRoutes = Router();

groupRoutes.post("/creategroup", verifyToken, createGroup);
groupRoutes.get("/getallgroups", verifyToken, getAllGroups);
groupRoutes.get("/getgroupmessages/:groupId", verifyToken, getGroupMessages);
groupRoutes.post("/addnewmember", verifyToken, addNewMemberToGroup);
groupRoutes.post("/removemember", verifyToken, removeMemberFromGroup);
groupRoutes.get("/allgroupmembers/:groupId", verifyToken, getAllGroupMembers);

export default groupRoutes;

