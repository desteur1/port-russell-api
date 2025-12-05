// test/models.test.js
require("./setup"); // Assure la configuration avant les tests

const chai = require("chai");
const expect = chai.expect;

const Catway = require("../models/Catway");
const Reservation = require("../models/Reservation");
const User = require("../models/User");

describe("Models tests", () => {
  describe("Catway model", () => {
    it("should list all catways", async () => {
      const catways = await Catway.find();
      expect(catways).to.be.an("array");
    });
  });

  describe("Reservation model", () => {
    it("should list all reservations", async () => {
      const reservations = await Reservation.find();
      expect(reservations).to.be.an("array");
    });
  });

  describe("User model", () => {
    it("it should list all users", async () => {
      const users = await User.find();
      expect(users).to.be.an("array");
    });
  });
});
