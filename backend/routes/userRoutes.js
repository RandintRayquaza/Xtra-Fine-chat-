import express from "express";
import {
  register,
  login,
  logout,
  getOtherUsers
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// 🔓 PUBLIC
router.post("/register", register);
router.post("/login", login);

// 🔐 PROTECTED
router.get("/logout", isAuthenticated, logout);
router.get("/other-users", isAuthenticated, getOtherUsers);

export default router;
