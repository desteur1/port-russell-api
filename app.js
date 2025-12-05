const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const authRoutes = require("./routes/authRoutes");
const catwayFormRoutes = require("./routes/catwayFormRoutes");
const reservationFormRoutes = require("./routes/reservationFormRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const documentationRoutes = require("./routes/documentationRoutes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//la jsdoc statique
app.use("/docs", express.static(path.join(__dirname, "docs")));

//Route publiques
app.use("/auth", authRoutes);

//Routes principales(accueil, login)
app.use("/", indexRouter);

//Routes protégées
app.use("/dashboard", dashboardRoutes);
app.use("/catways", catwayRoutes);
app.use("/catways/:idCatway/reservations", reservationRoutes);

//Routes des formulaires
app.use("/form/catways", catwayFormRoutes);
app.use("/form/reservations", reservationFormRoutes);

//Route documentation view avec ejs
app.use("/", documentationRoutes);

//Users route
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
