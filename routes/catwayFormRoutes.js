const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");
const authMiddleware = require("../middlewares/authMiddleware");

// toute les routes sont protégées par le middleware d'authentification
router.use(authMiddleware);

//créer un catway depuis le formulaire
router.post("/create", catwayController.createCatway);

//modifier un catway depuis le formulaire
router.post("/update", catwayController.updateCatwayForm);

//supprimer un catway depuis le formulaire
router.post("/delete", catwayController.deleteCatwayFromForm);

//afficher un catway spécifique depuis le formulaire
router.post("/view", catwayController.getCatwayByIdForm);

module.exports = router;
