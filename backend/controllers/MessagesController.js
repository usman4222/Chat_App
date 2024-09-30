import User from "../models/AuthModel.js";
import Message from "../models/MessagesModel.js";
import { mkdirSync, renameSync } from "fs"
import path from 'path';

export const getMessages = async (req, res) => {
    try {
        const user1 = req.userId;
        const user2 = req.body.id;

        if (!user1 || !user2) {
            return res.status(400).send("Both user ID are required.");
        }

        const messages = await Message.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 }
            ]
        }).sort({ timestamp: 1 })

        return res.status(200).json({ messages });
    } catch (error) {
        console.error("messages error:", error);
        return res.status(500).send("Internal server error");
    }
};



export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(500).send("File is required");
        }
        const date = Date.now();
        let fileDr = `uploads/files/${date}`;
        let fileName = `${fileDr}/${req.file.originalname}`;

        mkdirSync(fileDr, { recursive: true });
        renameSync(req.file.path, fileName);

        console.log(`File uploaded to: ${fileName}`); 

        return res.status(200).json({ filePath: fileName });
    } catch (error) {
        console.error("messages error:", error);
        return res.status(500).send("Internal server error");
    }
};
