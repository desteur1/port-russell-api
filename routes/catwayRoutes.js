const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes CRUD for Catways

//Routes publique (no authentication required)
router.get("/", catwayController.getAllCatways);
router.get("/:id", catwayController.getCatwayById);

//Routes protégées (authentication required)
router.post("/", authMiddleware, catwayController.createCatway);
router.put("/:id", authMiddleware, catwayController.updateCatway);
// route pour mise à jour partielle
router.patch("/:id", authMiddleware, catwayController.updatePartialCatway);
router.delete("/:id", authMiddleware, catwayController.deleteCatway);

module.exports = router;
