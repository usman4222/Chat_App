import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { addNewMemberToGroupByAdmin, createGroup, getAllGroupMembers, getAllGroups, getGroupMessages, memberRemoveItselfFromGroup, removeMemberFromGroupByAdmin } from "../controllers/GroupController.js";

const groupRoutes = Router();

groupRoutes.post("/creategroup", verifyToken, createGroup);
groupRoutes.get("/getallgroups", verifyToken, getAllGroups);
groupRoutes.get("/getgroupmessages/:groupId", verifyToken, getGroupMessages);
groupRoutes.post("/addnewmember", verifyToken, addNewMemberToGroupByAdmin);
groupRoutes.post("/removemember", verifyToken, removeMemberFromGroupByAdmin);
groupRoutes.post("/removememberitself", verifyToken, memberRemoveItselfFromGroup);
groupRoutes.get("/allgroupmembers/:groupId", verifyToken, getAllGroupMembers);

export default groupRoutes;
