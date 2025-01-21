const mongoose = require("mongoose");
module.exports = mongoose.model(
  "level",
  new mongoose.Schema({
    name: String,
    value: String,
  })
);
