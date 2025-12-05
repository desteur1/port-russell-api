const express = require("express");
const router = express.Router();

/* page d'accueil */
router.get("/", (req, res) => {
  res.render("index", { title: "Port Russell - Accueil", error: null });
});
// Page de login (GET)
router.get("/auth/login-view", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.render("index", { title: "Port Russell - Connexion", error: null });
});

// Dashboard route
router.get("/dashboard", (req, res) => {
  res.render("dashboard", { title: "Dashboard" });
});

// Login (POST)
router.post("/auth/login-view", async (req, res) => {
  /* POST login - appelle directement le controller */
  router.post("/auth/login", authController.login);
});

module.exports = router;
