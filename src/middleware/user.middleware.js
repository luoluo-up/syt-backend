const bcrypt = require("bcryptjs");
// 导入错误类型
const {
  userFormateError,
  userAlreadyExistError,
  userRegisterError,
  userNotExistError,
  invalidPasswordError,
  userLoginError,
  invalidSMSCodeError,
} = require("../constant/err.type");
const { getUserInfo, checkSMSCode } = require("../service/user.service");
// 注册表单验证（用户名+密码）
const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};

// 手机号验证码非空检查（用于登录）
const smsLoginValidator = async (ctx, next) => {
  const { phone, code } = ctx.request.body;
  if (!phone || !code) {
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};
//判断用户名是否重复
const userAlreadyExist = async (ctx, next) => {
  const { username } = ctx.request.body;
  try {
    const hasUser = await getUserInfo({ username });
    if (hasUser) {
      ctx.app.emit("error", userAlreadyExistError, ctx);
      return;
    }
  } catch (error) {
    ctx.app.emit("error", userRegisterError, ctx);
  }
  await next();
};

//密码加密
const encryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hashPassword;
  await next();
};
// 验证码登录验证
const verifySMSCode = async (ctx, next) => {
  const { phone, code } = ctx.request.body;

  try {
    // 1. 验证手机号是否存在
    const user = await getUserInfo({ phone });
    if (!user) {
      ctx.app.emit("error", userNotExistError, ctx);
      return;
    }

    if (user.code !== code) {
      ctx.app.emit("error", invalidSMSCodeError, ctx);
      return;
    }
  } catch (err) {
    ctx.app.emit("error", userLoginError, ctx);
    return;
  }

  await next();
};

module.exports = {
  userValidator,
  smsLoginValidator,
  userAlreadyExist,
  encryptPassword,
  verifySMSCode,
};
