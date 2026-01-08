import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket && userId) {
    socket = io(import.meta.env.VITE_SOCKET_URL, {
      query: { userId },
      transports: ["websocket"],
      withCredentials: true,
    });
  }

  return socket;
};

export const getSocket = () => socket;
