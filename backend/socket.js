import { Server as SocketIOServer } from "socket.io";

export const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketmap = new Map();

  const disconnect = (socket) => {
    console.log(`Client Disconnected: ${socket.id}`);
    for(const[userId, socketId] of userSocketmap.entries()){
        if(socketId === socket.id){
            userSocketmap.delete(userId)
            break
        }
    }
    
  };

  io.on("connection", (socket) => {
    const userId = socket.handShake.query.userId;
    
    if (userId) {
      userSocketmap.set(userId, socket.id);
      console.log(`User contected : ${userId} with socket ID: ${socket.id}`);

    } else {
      console.log("user id not provided during co0nnetion");
    }
    socket.on("disconnect", () => disconnect(socket));
  });
};
