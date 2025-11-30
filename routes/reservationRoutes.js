const express = require("express");
const router = express.Router({ mergeParams: true }); // pour accéder à :id du catway parent
const reservationController = require("../controllers/reservationController");
const authMiddleware = require("../middlewares/authMiddleware");

//Routes CRUD for Reservations(sous-ressource de Catway)
router.use(authMiddleware); // toutes les routes sont protégées
router.get("/", reservationController.getAllReservations);
router.get("/:idReservation", reservationController.getReservationById);
router.post("/", reservationController.createReservation);
router.delete(
  "/:idReservation",
  authMiddleware,
  reservationController.deleteReservation
);

module.exports = router;
