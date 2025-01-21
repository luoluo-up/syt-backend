const mongoose = require("mongoose");
module.exports = mongoose.model(
  "region",
  new mongoose.Schema({
    name: String,
    value: String,
  })
);
