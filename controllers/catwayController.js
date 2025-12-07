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

// créer un catway via le formulaire
exports.createCatwayForm = async (req, res) => {
  try {
    await Catway.create(req.body);

    // Redirection avec message de succès
    res.redirect("/dashboard?success=Catway créé avec succès");
  } catch (error) {
    // Redirection avec message d'erreur
    res.redirect("/dashboard?error=" + encodeURIComponent(error.message));
  }
};

// updatecatways via formulaire (update ejs)
exports.updateCatwayForm = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    req.params.id = id;
    await Catway.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    // Redirection avec message de succès
    res.redirect("/dashboard?success=Catway mis à jour avec succès");
  } catch (error) {
    // Redirection avec message d'erreur
    res.redirect("/dashboard?error=" + encodeURIComponent(error.message));
  }
};

// suppression via formulaire
exports.deleteCatwayFromForm = async (req, res) => {
  try {
    const { id } = req.body;
    await Catway.findByIdAndDelete(id);
    res.redirect("/dashboard?success=Catway supprimé avec succès");
  } catch (error) {
    res.redirect("/dashboard?error=" + encodeURIComponent(error.message));
  }
};

//recupérer les catways par id utilisateur via formulaire
exports.getCatwayByIdForm = async (req, res) => {
  try {
    const { id } = req.body;
    const catway = await Catway.findById(id);

    if (!catway) return res.status(404).send({ message: "Catway non trouvé" });

    res.render("catway", { catway }); // Rendre la vue avec les données du catway
  } catch (error) {
    res.status(400).send({ message: error.message }); // Mauvaise requête
  }
};
