module.exports = (success, error) => {
  // 判断error为其设置默认值
  if (typeof error !== "function") {
    error = () => {
      console.log("连接失败~~");
    };
  }
  const mongoose = require("mongoose");
  const { mongodbUrl } = require("../config/config.default");
  // const uri = `${MONGO_URI}/${MONGO_DB}`;
  //   const uri = `${mongodbUrl}`;
  // const { mongodbUrl } = process.env;
  mongoose.connect(mongodbUrl);
  //得到数据库连接句柄
  const db = mongoose.connection;
  db.once("open", () => {
    console.log("数据库连接成功");
    success();
  });
  db.on("error", (err) => {
    console.log("数据库连接失败", err);
    error();
    // 设置连接关闭的回调
    db.on("close", () => {
      console.log("数据库连接关闭");
    });
  });
};
