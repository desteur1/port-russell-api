const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");

// protéger les routes utilisateur
router.use(authMiddleware);

// afficher la liste des utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.render("users-list", { users });
  } catch (err) {
    res.redirect("/dashboard?error=" + encodeURIComponent(err.message));
  }
});

//modifier un utilisateur
router.post("/update", async (req, res) => {
  try {
    const { id, name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      const acceptsHtml = (req.headers.accept || "").includes("text/html");
      if (acceptsHtml) {
        return res.redirect(
          "/dashboard?error=" + encodeURIComponent("Utilisateur non trouvé")
        );
      }
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const acceptsHtml = (req.headers.accept || "").includes("text/html");
    if (acceptsHtml) {
      return res.redirect(
        "/dashboard?success=" +
          encodeURIComponent("Utilisateur mis à jour avec succès")
      );
    }
    res.json({ message: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    const acceptsHtml = (req.headers.accept || "").includes("text/html");
    if (acceptsHtml) {
      return res.redirect(
        "/dashboard?error=" + encodeURIComponent(error.message)
      );
    }
    res.status(500).json({ message: error.message });
  }
});

// supprimer un utilisateur
router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      const acceptsHtml = (req.headers.accept || "").includes("text/html");
      if (acceptsHtml) {
        return res.redirect(
          "/dashboard?error=" + encodeURIComponent("Utilisateur non trouvé")
        );
      }
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const acceptsHtml = (req.headers.accept || "").includes("text/html");
    if (acceptsHtml) {
      return res.redirect(
        "/dashboard?success=" +
          encodeURIComponent("Utilisateur supprimé avec succès")
      );
    }
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    const acceptsHtml = (req.headers.accept || "").includes("text/html");
    if (acceptsHtml) {
      return res.redirect(
        "/dashboard?error=" + encodeURIComponent(error.message)
      );
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
