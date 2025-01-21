const mongoose = require("mongoose");
module.exports = mongoose.model(
  "hospital",
  new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    level: { type: String, required: true },
    hostype: { type: String, required: true },
    introduce: { type: String, required: true },
    img: { type: String, required: true },
    districtCode: { type: String, required: true },
    district: { type: String, required: true },
    hoscode: { type: String, required: true },
  })
);
