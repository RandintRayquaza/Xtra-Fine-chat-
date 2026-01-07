import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// helper
const cookieOptions = {
  httpOnly: true,
  secure: false,     // 🔥 allow Postman
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000,
};


/* REGISTER */
export const register = async (req, res) => {
   

  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePhoto =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const user = await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto,
      gender,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(201)
      .cookie("token", token, cookieOptions)
      .json({ success: true, user });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({ success: true, user });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* LOGOUT */
export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      ...cookieOptions,
      expires: new Date(0),
    })
    .json({ success: true });
};

/* OTHER USERS */
export const getOtherUsers = async (req, res) => {
  const users = await User.find({
    _id: { $ne: req.user._id },
  }).select("-password");

  res.status(200).json({ users });
};
/* GET ME */
export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};
