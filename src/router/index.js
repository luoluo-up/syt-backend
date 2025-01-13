const Router = require("koa-router");

const router = new Router({ prefix: "/hospital" });
const path = require("path");
const fs = require("fs");
// 读取当前目录下的所有文件;
fs.readdirSync(__dirname).forEach((file) => {
  // 过滤出以 .route.js 结尾的文件
  if (file.endsWith(".route.js")) {
    const route = require(path.join(__dirname, file));
    router.use(route.routes(), route.allowedMethods()); // 注册路由
  }
});

module.exports = router;
