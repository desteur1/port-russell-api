// test/auth.test.js
require("./setup"); // Assure la configuration avant les tests

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); //  fichier app.js
const User = require("../models/user");
const bcrypt = require("bcryptjs");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Auth API", () => {
  // on vide la base et on crée un utilisateur pour les tests de login
  before(async () => {
    await User.deleteMany({});
    //création via la route pour être que tout est identique à une vraie création
    await chai.request(app).post("/auth/register").send({
      name: "Login User",
      email: "login@example.com",
      password: "123456",
    });
  });

  describe("POST /auth/register", () => {
    it("should register a new user", (done) => {
      chai
        .request(app)
        .post("/auth/register")
        .send({
          name: "Register User",
          email: "register@example.com",
          password: "abcdef",
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("newUser");
          expect(res.body.newUser).to.have.property(
            "email",
            "register@example.com"
          );
          done();
        });
    });
    it("should fail to register if email already exists", (done) => {
      chai
        .request(app)
        .post("/auth/register")
        .send({
          name: "Duplicate User",
          email: "login@example.com", // email déjà utilisé
          password: "abcdef",
        })
        .end((err, res) => {
          expect(res).to.have.status(400); // ou le status que tu renvoies pour email existant
          expect(res.body).to.have.property("message");
          done();
        });
    });
  });

  describe("POST /auth/login", () => {
    it("should login successfully with correct credentials", (done) => {
      chai
        .request(app)
        .post("/auth/login")
        .set("Accept", "application/json")
        .send({
          email: "login@example.com",
          password: "123456",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("token");
          done();
        });
    });
  });
  it("should fail login with wrong password", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .send({
        email: "login@example.com",
        password: "wrongpassword",
      })
      .end((err, res) => {
        expect(res).to.have.status(400); // idem
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
