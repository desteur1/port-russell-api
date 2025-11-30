const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  catwayNumber: { type: Number, required: true },
  clientName: { type: String, required: true },
  boatName: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Référence à l'utilisateur qui a créé la réservation
});

module.exports = mongoose.model("Reservation", reservationSchema);
