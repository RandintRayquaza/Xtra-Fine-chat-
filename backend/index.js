import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ CORS — MUST be first
app.use(cors({
  origin: "https://fictional-orbit-q7g69rj67ggpc96jg-5173.app.github.dev",
  credentials: true,
}));

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/users", userRoutes);
app.use("/messages", messageRoutes);

// db + server
await connectDB();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on ${PORT}`);
});
