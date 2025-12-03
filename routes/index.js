const express = require("express");
const router = express.Router();
const axios = require("axios"); // Import axios for making HTTP requests

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// Dashboard route
router.get("/dashboard", (req, res) => {
  res.render("dashboard", { title: "Dashboard" });
});

router.post("/auth/login-view", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      req.body
    );
    const token = response.data.token;

    // On stocke le token dans un cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.redirect("/dashboard");
  } catch (err) {
    res.render("index", { error: "Identifiants incorrects" });
  }
});

module.exports = router;
