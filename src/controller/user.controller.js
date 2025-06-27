const jwt = require("jsonwebtoken");
const {
  createUser,
  findSmsCode,
  getUserInfo,
} = require("../service/user.service");
const {
  userRegisterError,
  smsCodeError,
  userNotExistError,
  invalidPasswordError,
  userLoginError,
} = require("../constant/err.type");
class UserController {
  async register(ctx, next) {
    //   获取用户数据
    const { username, password } = ctx.request.body;
    //操作数据库
    try {
      const res = await createUser(username, password);
      ctx.body = {
        code: 200,
        message: "注册成功",
        result: res,
      };
    } catch (error) {
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }
  async login(ctx, next) {
    const { phone } = ctx.request.body;

    try {
      // 1. 获取用户信息（排除密码字段）
      const user = await getUserInfo({ phone });

      // 2. 生成JWT令牌
      const token = jwt.sign(
        { id: user.id, phone: user.phone },
        process.env.JWT_SECRET || "default_secret_key",
        { expiresIn: "7d" }
      );

      ctx.body = {
        code: 200,
        message: "登录成功",
        result: {
          token,
          username: user.username,
        },
      };
    } catch (err) {
      console.error("登录失败:", err);
      ctx.app.emit("error", userLoginError, ctx);
    }
  }

  async smscode(ctx, next) {
    const { phone } = ctx.params;
    try {
      // 生成 6 位随机验证码，范围：100000 ~ 999999
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      await findSmsCode(phone, code);
      ctx.body = {
        code: 200,
        message: "验证码生成成功，请注意查收",
        data: code,
      };
    } catch (error) {
      ctx.app.emit("error", smsCodeError, ctx);
    }
  }
}
module.exports = new UserController();
