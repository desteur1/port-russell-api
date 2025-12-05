const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // support header Authorization: Bearer <token> OR cookie "token"
  const authHeader = req.headers.authorization;
  const tokenFromHeader =
    authHeader && typeof authHeader === "string"
      ? authHeader.split(" ")[1]
      : null;
  const tokenFromCookie =
    req.cookies && req.cookies.token ? req.cookies.token : null;

  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    // si la requête attend une page HTML (navigateur), rediriger vers l'accueil
    const acceptsHtml = (req.headers.accept || "").includes("text/html");
    if (acceptsHtml) return res.redirect("/"); // ou /?error=token
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contient { id: userId } tel que signé
    next();
  } catch (err) {
    const acceptsHtml = (req.headers.accept || "").includes("text/html");
    if (acceptsHtml) return res.redirect("/?error=token_invalide");
    return res.status(401).json({ message: "Token invalide" });
  }
};

module.exports = authMiddleware;
