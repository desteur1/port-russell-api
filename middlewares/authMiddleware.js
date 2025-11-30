const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Token manquant" });

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // tu peux accéder aux infos de l'utilisateur via req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

module.exports = authMiddleware;
