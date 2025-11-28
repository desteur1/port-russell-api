const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");

// Routes CRUD for Catways
router.get("/", catwayController.getAllCatways);
router.get("/:id", catwayController.getCatwayById);
router.post("/", catwayController.createCatway);
router.put("/:id", catwayController.updateCatway);
// route pour mise à jour partielle
router.patch("/:id", catwayController.updatePartialCatway);
router.delete("/:id", catwayController.deleteCatway);

module.exports = router;
