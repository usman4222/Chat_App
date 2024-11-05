import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";
import Group from "./models/GroupModel.js";

const setupSocket = (server) => {
  console.log("Setting up socket...");

  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  console.log("Socket.IO server created.");

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client Disconnected: ${socket.id}`);

    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };


  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender)
    const recipientSocketId = userSocketMap.get(message.recipient)

    const createdMessage = await Message.create(message)

    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image color")
      .populate("recipient", "id email firstName lastName image color")

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("recieveMessage", messageData)
      console.log("you receives a nessage from", senderSocketId);
      
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("recieveMessage", messageData)
    }
  }


  const sendGroupMessage = async (message) => {
    const { groupId, sender, content, messageType, fileUrl } = message;

    const createdMessage = await Message.create({
      sender,
      recipient: null,
      content,
      messageType,
      timestamp: Date.now(),
      fileUrl
    })


    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image color")
      .exec()

    await Group.findByIdAndUpdate(groupId, {
      $push: { messages: createdMessage._id }
    })


    const group = await Group.findById(groupId).populate("members")

    const data = { ...messageData._doc, groupId: group._id }

    if (group && group.members) {
      group.members.forEach((member) => {

        const memberSocketId = userSocketMap.get(member._id.toString())

        if (memberSocketId) {
          io.to(memberSocketId).emit("recieve-group-message", data)
        }

      })
      const adminSocketId = userSocketMap.get(group.admin._id.toString())

      if (adminSocketId) {
        io.to(adminSocketId).emit("recieve-group-message", data)
      }
    }
  }


  io.on("connection", (socket) => {

    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    }
    else {
      console.log("User ID not provided during connection.");
    }

    socket.on("sendMessage", sendMessage);
    socket.on("send-group-message", sendGroupMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
