const mongoose = require("mongoose");

module.exports = mongoose.model(
  "hosinfo",
  new mongoose.Schema({
    id: { type: String, required: true },
    createTime: { type: String, required: true },
    updateTime: { type: String, required: true },
    isDeleted: { type: Number, default: 0 },
    param: {
      hostypeString: { type: String, required: true },
      fullAddress: { type: String, required: true },
    },
    hoscode: { type: String, required: true },
    hosname: { type: String, required: true },
    hostype: { type: String, required: true },
    provinceCode: { type: String, required: true },
    cityCode: { type: String, required: true },
    districtCode: { type: String, required: true },
    address: { type: String, required: true },
    logoData: { type: String, required: true },
    intro: { type: String, required: true },
    route: { type: String, required: true },
    status: { type: Number, default: 1 },
    bookingRule: {
      cycle: { type: Number, required: true },
      releaseTime: { type: String, required: true },
      stopTime: { type: String, required: true },
      quitDay: { type: Number, required: true },
      quitTime: { type: String, required: true },
      rule: { type: [String], required: true },
    },
  })
);
