// Import du modèle Reservation
const Reservation = require("../models/Reservation");
const catway = require("../models/Catway");

// liste de toutes les réservations pour un catway spécifique
exports.getAllReservations = async (req, res) => {
  try {
    const catwayNumber = Number(req.params.idCatway); //  conversion en nombre
    const reservations = await Reservation.find({ catwayNumber });
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
    await reservation.deleteOne();

    res.json({ message: "Réservation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Erreur serveur
  }
};

// ---- Fonctions pour gérer les formulaires ----

//reversation via formulaire
exports.createReservationFromForm = async (req, res) => {
  try {
    await Reservation.create({
      ...req.body,
      createdBy: req.user.id, // Récupérer l'ID de l'utilisateur authentifié
    });
    res.redirect(
      "/dashboard?success=" +
        encodeURIComponent("Réservation créée avec succès")
    ); // Rediriger vers le tableau de bord après la création
  } catch (error) {
    res.redirect("/dashboard?error=" + encodeURIComponent(error.message)); // Mauvaise requête
  }
};

// supprimer une réservation via formulaire
exports.deleteReservationFromForm = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.body.id);
    if (!reservation) throw new Error("Réservation non trouvée");
    // vérifier si l'utilisateur est le créateur de la réservation
    if (reservation.createdBy.toString() !== req.user.id)
      throw new Error("Action non autorisée");

    await reservation.deleteOne();
    res.redirect(
      "/dashboard?success=" +
        encodeURIComponent("Réservation supprimée avec succès")
    ); // Rediriger vers le tableau de bord après la suppression
  } catch (error) {
    res.redirect("/dashboard?error=" + encodeURIComponent(error.message)); // Mauvaise requête
  }
};

//afficher une réservation via formulaire
exports.getReservationByIdFromForm = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.body.id);
    if (!reservation) throw new Error("Réservation non trouvée");

    //pour afficher les détails de la réservation dans le tableau de bord
    res.render("reservation", { reservation });
  } catch (error) {
    res.status(400).json({ message: error.message }); // Mauvaise requête
  }
};
