import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket && userId) {
    socket = io(
      "https://fictional-orbit-q7g69rj67ggpc96jg-8000.app.github.dev",
      {
        query: { userId },
        transports: ["websocket"],
        withCredentials: true,
      }
    );

    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
    });
  }

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
