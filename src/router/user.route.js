const Router = require("koa-router");
const router = new Router({ prefix: "/user" });
// 导入中间件
const {
  userValidator,
  userAlreadyExist,
  encryptPassword,
} = require("../middleware/user.middleware");
const { register } = require("../controller/user.controller");
router.get("/", async (ctx, next) => {
  ctx.body = "用户路由";
});

// 注册接口
router.post(
  "/register",
  userValidator,
  userAlreadyExist,
  encryptPassword,
  register
);
//登录接口
router.post("/login", async (ctx, next) => {
  ctx.body = "登录接口";
});
module.exports = router;
