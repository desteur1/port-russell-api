/**
 * @module controllers/authController
 * @description Contrôleur pour l'authentification des utilisateurs
 */

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @function register
 * @description crée un nouvel utilisateur
 * @param {*} req - Requête express
 * @param {*} res - Réponse express
 * @returns {Promise<void>} - Envoie une réponse JSON ou redirige
 */

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const acceptsHtml = (req.headers.accept || "").includes("text/html");
      if (acceptsHtml) return res.redirect("/?error=utilisateur_existe");
      return res.status(400).json({ message: "utilisateur déjà existant" });
    }

    const newUser = new User({ name, email, password }); // le hashage est fait dans le modèle (user.js)

    await newUser.save(); // hash fait dans pre ('save') du modèle User

    const acceptsHtml = (req.headers.accept || "").includes("text/html");
    if (acceptsHtml) return res.redirect("/dashboard"); // redirige vers le dashboard après inscription
    res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @function login
 * @description authentifie un utilisateur et retourne un token JWT
 * @param {*} req - Requête express
 * @param {*} res - Réponse express
 * @returns {Promise<void>} - Envoie un token JWT ou redirige
 */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const acceptsHtml = (req.headers.accept || "").includes("text/html");
      if (acceptsHtml)
        return res.status(400).render("index", {
          title: "Port Russell - Connexion",
          error: "Utilisateur non trouvé",
        });
      return res.status(400).json({ message: "utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const acceptsHtml = (req.headers.accept || "").includes("text/html");
      if (acceptsHtml)
        return res.status(400).render("index", {
          title: "Port Russell - Connexion",
          error: "Mot de passe incorrect",
        });
      return res.status(400).json({ message: "mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const acceptsHtml = (req.headers.accept || "").includes("text/html");
    if (acceptsHtml) {
      //si la requête provient d'un formulaire HTML, on redirige avec un cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production", // cookie sécurisé en production(en production, on utilise HTTPS, secure = true)
        maxAge: 60 * 60 * 1000, // 1h
      });
      return res.redirect("/dashboard");
    }

    // Otherwise return json for API clients
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
