import { Router } from "express";
import { getAllContacts, getContactsForDMList, SearchContacts } from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactsRoutes = Router();

contactsRoutes.post("/searchcontact", verifyToken, SearchContacts);
contactsRoutes.get("/getcontactfordm", verifyToken, getContactsForDMList);
contactsRoutes.get("/getallcontacts", verifyToken, getAllContacts);

export default contactsRoutes;
