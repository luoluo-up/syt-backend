const Router = require("koa-router");
const router = new Router({ prefix: "/user" });
// 导入中间件
const {
  userValidator,
  smsLoginValidator,
  userAlreadyExist,
  encryptPassword,
  verifySMSCode,
} = require("../middleware/user.middleware");
const { register, smscode, login } = require("../controller/user.controller");
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

// 验证码登录接口
router.post("/login", smsLoginValidator, verifySMSCode, login);
// 获取验证码
router.get("/smscode/:phone", smscode);
module.exports = router;
