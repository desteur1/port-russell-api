const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

//affichage de la page de login
router.get("/login", (req, res) => {
  res.render("index", { title: "Connexion" });
});

// User registration route
router.post("/register", authController.register);
// User login route(API) c'est ici que le formulaire de login envoie les données
router.post("/login", authController.login);

module.exports = router;
