import { Router } from "express";
import { getContactsForDMList, SearchContacts } from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactsRoutes = Router();

contactsRoutes.post("/searchcontact", verifyToken, SearchContacts);
contactsRoutes.get("/getcontactfordm", verifyToken, getContactsForDMList);

export default contactsRoutes;
