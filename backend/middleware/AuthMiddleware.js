const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

require('dotenv').config(); // ✅ Ensure .env is loaded

const protectRoute = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ use env secret
    const user = await User.findById(decoded.id || decoded.userId).select('-password');
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protectRoute };
