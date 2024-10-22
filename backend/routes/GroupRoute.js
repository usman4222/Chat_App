import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { addNewAdminByAdmin, addNewMemberToGroupByAdmin, createGroup, delGroupByAdmin, getAllGroupMembers, getAllGroups, getGroupMessages, memberRemoveItselfFromGroup, removeMemberFromGroupByAdmin } from "../controllers/GroupController.js";

const groupRoutes = Router();

groupRoutes.post("/creategroup", verifyToken, createGroup);
groupRoutes.get("/getallgroups", verifyToken, getAllGroups);
groupRoutes.get("/getgroupmessages/:groupId", verifyToken, getGroupMessages);
groupRoutes.post("/addnewmember", verifyToken, addNewMemberToGroupByAdmin);
groupRoutes.post("/removemember", verifyToken, removeMemberFromGroupByAdmin);
groupRoutes.post("/removememberitself", verifyToken, memberRemoveItselfFromGroup);
groupRoutes.delete("/delgroupbyadmin", verifyToken, delGroupByAdmin);
groupRoutes.get("/allgroupmembers/:groupId", verifyToken, getAllGroupMembers);
groupRoutes.post("/addnewadmin", verifyToken, addNewAdminByAdmin);

export default groupRoutes;
