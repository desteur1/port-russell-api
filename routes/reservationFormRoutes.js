const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const authMiddleware = require("../middlewares/authMiddleware");

// toutes les routes sont protégées avec le middleware d'authentification
router.use(authMiddleware);

// créer une réservation depuis le formulaire
router.post("/create", reservationController.createReservationFromForm);
//supprimer une réservation depuis le formulaire
router.post("/delete", reservationController.deleteReservationFromForm);
//afficher une réservation spécifique depuis le formulaire
router.post("/view", reservationController.getReservationByIdFromForm);

module.exports = router;
