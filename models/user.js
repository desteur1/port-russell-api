/**
 * @module models/user
 * @description Schéma Mongoose pour les utilisateurs
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * @typedef {Object} User
 * @property {string} name - Le nom de l'utilisateur
 * @property {string} email - L'email de l'utilisateur (unique)
 * @property {string} password - Le mot de passe hashé de l'utilisateur
 */

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Middleware pour hasher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return; // si pas modifié, on sort
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
