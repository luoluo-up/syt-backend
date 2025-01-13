//导入 mongoose
const mongoose = require("mongoose");
module.exports = mongoose.model(
  "user",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      description: "用户名",
    },
    password: {
      type: String,
      required: true,
      description: "密码",
    },
    create_time: {
      type: Date,
    },
  })
);
