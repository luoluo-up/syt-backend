const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  hoscode: { type: String, required: true }, // 医院代码
  departments: [
    {
      depcode: { type: String, required: true }, // 科室代码
      depname: { type: String, required: true }, // 科室名称
      children: [
        {
          depcode: { type: String, required: true }, // 子科室代码
          depname: { type: String, required: true }, // 子科室名称
        },
      ],
    },
  ],
});

module.exports = mongoose.model("department", departmentSchema);
