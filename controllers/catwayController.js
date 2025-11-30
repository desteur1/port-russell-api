// Import du modèle Catway
const Catway = require("../models/Catway");

// liste de tous les catways
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Erreur serveur
  }
};

// details d'un catway spécifique
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: "Catway non trouvé" });
    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Erreur serveur
  }
};

// créer un nouveau catway
exports.createCatway = async (req, res) => {
  try {
    const newCatway = await Catway.create(req.body);
    res.status(201).json(newCatway); // Créé avec succès
  } catch (error) {
    res.status(400).json({ message: error.message }); // Mauvaise requête
  }
};

//Remplacement complet (PUT)
exports.updateCatway = async (req, res) => {
  try {
    const updatedCatway = await Catway.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCatway)
      return res.status(404).json({ message: "Catway non trouvé" });
    res.json(updatedCatway);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Mauvaise requête
  }
};

//Mise à jour partielle (PATCH)
exports.updatePartialCatway = async (req, res) => {
  try {
    const updatedCatway = await Catway.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedCatway)
      return res.status(404).json({ message: "Catway non trouvé" });
    res.json(updatedCatway);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Mauvaise requête
  }
};

// suppression d'un catway
exports.deleteCatway = async (req, res) => {
  try {
    const deleted = await Catway.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Catway non trouvé" });
    res.json({ message: "Catway supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Erreur serveur
  }
};
