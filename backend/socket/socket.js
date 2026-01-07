import { Server } from "socket.io";

let io;
const userSocketMap = {}; // userId -> socketId

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "https://fictional-orbit-q7g69rj67ggpc96jg-5173.app.github.dev",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    socket.on("disconnect", () => {
      for (const id in userSocketMap) {
        if (userSocketMap[id] === socket.id) {
          delete userSocketMap[id];
          break;
        }
      }
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

// ✅ SAFE ACCESSOR
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
