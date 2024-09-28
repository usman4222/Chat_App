import { Server as SocketIOServer } from "socket.io";

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

  io.on("connection", (socket) => {
    console.log("New client connected.");

    const userId = socket.handshake.query.userId;

    if (!userId) {
      console.log("User ID not provided during connection.");
      socket.disconnect(); 
      return;
    }

    userSocketMap.set(userId, socket.id);
    console.log(`User connected: ${userId} with socket ID: ${socket.id}`);

    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
