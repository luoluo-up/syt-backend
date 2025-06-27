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
    phone: {
      type: String,
      required: true,
      unique: true,
      description: "手机号",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      description: "邮箱",
    },
    code: {
      type: String,
      required: true,
      description: "验证码",
    },
    create_time: {
      type: Date,
    },
  })
);
