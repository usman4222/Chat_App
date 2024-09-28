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

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client Disconnected: ${socket.id}`);
    for(const[userId, socketId] of userSocketMap.entries()){
        if(socketId === socket.id){
          userSocketMap.delete(userId)
            break
        }
    }
    
  };
  console.log("Socket.IO server created.");

  io.on("connection", (socket) => {
    console.log("New client connected."); 
    const userId = socket.handshake.query.userId;


    if (!userId) {
      console.log("user id not provided during connection");
      socket.disconnect(); // Optionally disconnect the client if userId is missing
      return;
    }
    
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User contected : ${userId} with socket ID: ${socket.id}`);

    } else {
      console.log("user id not provided during co0nnetion");
    }
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket