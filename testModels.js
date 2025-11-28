const mongoose = require("mongoose");
const Catway = require("./models/Catway");
const Reservation = require("./models/Reservation");
const User = require("./models/User");

// Connexion à MongoDB locale
mongoose
  .connect("mongodb://127.0.0.1:27017/port_russell")
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log(err));

async function testModels() {
  try {
    // 1️⃣ Lister tous les catways
    const catways = await Catway.find();
    console.log("Catways:", catways);

    // 2️⃣ Lister toutes les réservations
    const reservations = await Reservation.find();
    console.log("Reservations:", reservations);

    // 3️⃣ Ajouter un utilisateur test seulement s’il n’existe pas
    let user = await User.findOne({ email: "test@example.com" });
    if (!user) {
      user = new User({
        name: "Test User",
        email: "test@example.com",
        password: "123456", // le middleware bcrypt hashera ce mot de passe
      });
      await user.save();
      console.log("Utilisateur test créé:", user);
    } else {
      console.log("Utilisateur test déjà existant:", user);
    }
  } catch (err) {
    console.error("Erreur pendant le test:", err);
  } finally {
    // Déconnexion de MongoDB
    mongoose.disconnect();
  }
}

testModels();
