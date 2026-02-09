// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded JWT:", decoded); // Debug
      req.user = await User.findById(decoded.id || decoded._id).select("-password");

      console.log("User found:", req.user ? req.user.email : "No user"); // Debug

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } else {
      return res.status(401).json({ message: "Please login to access this route" });
    }
  } catch (error) {
    console.error("JWT ERROR:", error);
    return res.status(401).json({ message: "Token failed", error: error.message });
  }
};

const isManufacturer = (req, res, next) => {
  console.log("isManufacturer check. Role:", req.user?.role); // Debug
  if (req.user && req.user.role === "manufacturer") {
    next();
  } else {
    console.warn("User is not manufacturer:", req.user?.role); // Debug
    res.status(403).json({ message: "Not authorized as manufacturer" });
  }
};

module.exports = { protect, isManufacturer };
