import { io } from "socket.io-client";

let socket = null;

const getSocketUrl = () => {
  if (import.meta.env.VITE_SOCKET_URL) return import.meta.env.VITE_SOCKET_URL;
  if (typeof window !== "undefined") return window.location.origin;
  return "";
};

export const connectSocket = (userId) => {
  if (!socket && userId) {
    const socketUrl = getSocketUrl();

    socket = io(socketUrl, {
      query: { userId },
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }

  return socket;
};

export const getSocket = () => socket;
