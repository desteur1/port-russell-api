// test/setup.js
const mongoose = require("mongoose");
require("dotenv").config();

before(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect("mongodb://127.0.0.1:27017/port_russell_test");
    console.log("MongoDB connected successfully");
  }
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});
