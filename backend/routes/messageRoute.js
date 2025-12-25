import express from "express";
import { sendMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// 🔐 Protected (OPTIONS allowed by middleware)
router.post("/:id", isAuthenticated, sendMessage);

export default router;
