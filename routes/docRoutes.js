const express = require("express");
const router = express.Router();

//page documentation API
router.get("/documentation", (req, res) => {
  res.render("documentation");
});

module.exports = router;
