const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");

//protéger l'accès au dashboard
router.use(authMiddleware);

// Page gestion des catways dans le dashboard (création, modification, suppression)
router.get("/", async (req, res) => {
  try {
    const catways = await Catway.find();
    const reservations = await Reservation.find();
    res.render("dashboard", { catways, reservations, query: req.query || {} });
  } catch (error) {
    res.redirect("/dashboard?error=" + encodeURIComponent(error.message));
  }
});

// liste des catways( page publique du dashboard)
router.get("/catways", async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render("catways-list", { catways }); // Nom du fichier EJS
  } catch (error) {
    res.redirect("/dashboard?error=" + encodeURIComponent(error.message));
  }
});

//afficher la les détails d'un catway
router.get("/view-catway", async (req, res) => {
  try {
    const catway = await Catway.findById(req.query.id);
    if (!catway) return res.status(404).send("Catway non trouvé");
    res.render("catway", { catway: catway });
  } catch (error) {
    res.status(500).send("Erreur du serveur");
  }
});

// Page liste des réservations
router.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find(); // ou filtrer par user si besoin
    res.render("reservations-list", { reservations }); // liste réservations
  } catch (error) {
    res.redirect("/dashboard?error=" + encodeURIComponent(error.message));
  }
});

// Page détails réservation via query ?id=...
router.get("/view-reservation", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.query.id);
    if (!reservation) throw new Error("Réservation non trouvée");

    res.render("reservation", { reservation }); // détails réservation
  } catch (error) {
    res.redirect("/dashboard?error=" + encodeURIComponent(error.message));
  }
});

module.exports = router;
