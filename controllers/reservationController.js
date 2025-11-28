// Import du modèle Reservation
const Reservation = require("../models/Reservation");

exports.getAllReservations = async (req, res) => {
  res.send(`Toutes les réservations pour le catway ${req.params.idCatway}`);
};

exports.getReservationById = async (req, res) => {
  res.send(`Détails réservation ${req.params.idReservation}`);
};

exports.createReservation = async (req, res) => {
  res.send(`Créer une réservation pour le catway ${req.params.id}`);
};

exports.deleteReservation = async (req, res) => {
  res.send(
    `Supprimer réservation ${req.params.idReservation} du catway ${req.params.id}`
  );
};
