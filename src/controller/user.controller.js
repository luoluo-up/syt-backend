const { createUser } = require("../service/user.service");
const { userRegisterError } = require("../constant/err.type");
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
}
module.exports = new UserController();
