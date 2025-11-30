// Import du modèle Reservation
const Reservation = require("../models/Reservation");

// liste de toutes les réservations pour un catway spécifique
exports.getAllReservations = async (req, res) => {
  try {
    const catwayNumber = Number(req.params.idCatway); //  conversion en nombre
    const reservations = await Reservation.find({
      catwayNumber: req.params.idCatway,
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Erreur serveur
  }
};

// détails d'une réservation spécifique
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation)
      return res.status(404).json({ message: "Réservation non trouvée" });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Erreur serveur
  }
};

//créer une nouvelle réservation
exports.createReservation = async (req, res) => {
  try {
    const newReservation = await Reservation.create({
      ...req.body,
      catwayNumber: req.params.idCatway,
      createdBy: req.user.id, // Récupérer l'ID de l'utilisateur authentifié
    });
    res.status(201).json(newReservation); // Créé avec succès
  } catch (error) {
    res.status(400).json({ message: error.message }); // Mauvaise requête
  }
};

//supprimer une réservation
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation)
      return res.status(404).json({ message: "Réservation non trouvée" });
    // vérifier si l'utilisateur est le créateur de la réservation
    if (reservation.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Action non autorisée" });

    // supprimer la réservation
    await Reservation.findByIdAndDelete(req.params.idReservation);

    res.json({ message: "Réservation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Erreur serveur
  }
};
