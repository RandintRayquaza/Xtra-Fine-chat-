import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoute.js"; 
import { initSocket } from "./socket/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "https://fictional-orbit-q7g69rj67ggpc96jg-5173.app.github.dev",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
app.use("/messages", messageRoutes);

await connectDB();

// 🔥 INIT SOCKET ON SAME SERVER
initSocket(server);

const PORT = process.env.PORT || 8000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on ${PORT}`);
});
