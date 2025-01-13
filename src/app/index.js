const Koa = require("koa");
const path = require("path");
const app = new Koa();
const { koaBody } = require("koa-body");
const errHandler = require("../constant/err.handler");
const cors = require("@koa/cors");
// 导入路由
const router = require("../router");
app.use(cors());
app.use(
  koaBody({
    multipart: true, // 启用 multipart 支持
    formidable: {
      uploadDir: path.join(__dirname, "../upload"),
      keepExtensions: true,
    },
    parsedMethods: ["POST", "PUT", "PATCH", "DELETE"],
  })
);
// 注册路由;
app.use(router.routes()).use(router.allowedMethods());
// 默认响应
app.use(async (ctx) => {
  ctx.body = "Hello, World!";
});

app.on("error", errHandler);
module.exports = app;
