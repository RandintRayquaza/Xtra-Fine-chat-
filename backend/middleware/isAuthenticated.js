import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  // ✅ VERY IMPORTANT: allow preflight
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default isAuthenticated;
