const jwt = require("jsonwebtoken");
const jwtsecret = "Mynameisaditya";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), jwtsecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
