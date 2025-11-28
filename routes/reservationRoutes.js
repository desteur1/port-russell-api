const express = require("express");
const router = express.Router({ mergeParams: true }); // pour accéder à :id du catway parent
const reservationController = require("../controllers/reservationController");

//Routes CRUD for Reservations(sous-ressource de Catway)
router.get("/", reservationController.getAllReservations);
router.get("/:idReservation", reservationController.getReservationById);
router.post("/", reservationController.createReservation);
router.delete("/:idReservation", reservationController.deleteReservation);

module.exports = router;
