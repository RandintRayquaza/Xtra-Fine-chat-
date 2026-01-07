import express from "express";
import { sendMessage, getMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/sendmessage/:userId", isAuthenticated, sendMessage);
router.get("/:userId", isAuthenticated, getMessage);

export default router;
