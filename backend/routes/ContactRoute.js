import { Router } from "express";
import { SearchContacts } from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactsRoutes = Router();

contactsRoutes.post("/searchcontact", verifyToken, SearchContacts);

export default contactsRoutes;
