import express from "express";
import {
  register,
  login,
  logout,
  getOtherUsers,
  getMe,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// AUTH
router.post("/signup", register); // ✅ FIXED
router.post("/login", login);
router.post("/logout", logout);

// USERS
router.get("/me", isAuthenticated, getMe);
router.get("/other-users", isAuthenticated, getOtherUsers);


export default router;
