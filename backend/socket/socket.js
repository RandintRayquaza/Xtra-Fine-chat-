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
    console.log("🟢 Socket connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log("👥 Online users:", Object.keys(userSocketMap));
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // 🔥 REAL-TIME MESSAGE EVENT
    socket.on("sendMessage", ({ receiverId, message }) => {
      const receiverSocketId = userSocketMap[receiverId];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", message);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);

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
export { getReceiverSocketId };
