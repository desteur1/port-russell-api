// Import du modèle Catway
const Catway = require("../models/Catway");

exports.getAllCatways = async (req, res) => {
  res.send("Liste de tous les catways");
};

exports.getCatwayById = async (req, res) => {
  res.send(`Détails du catway ${req.params.id}`);
};

exports.createCatway = async (req, res) => {
  res.send("Créer un catway");
};

exports.updateCatway = async (req, res) => {
  res.send(`Modifier catway ${req.params.id}`);
};
exports.updatePartialCatway = async (req, res) => {
  res.send(`Mise à jour partielle du catway ${req.params.id}`);
};

exports.deleteCatway = async (req, res) => {
  res.send(`Supprimer catway ${req.params.id}`);
};
