import express from "express";
import {
  register,
  login,
  logout,
  getOtherUsers,
  getMe,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// AUTH
router.post("/signup", register); // ✅ FIXED
router.post("/login", login);
router.post("/logout", logout);

// USERS
router.get("/me", protect, getMe);
router.get("/other-users", protect, getOtherUsers);

export default router;
