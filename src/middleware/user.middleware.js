const bcrypt = require("bcryptjs");
// 导入错误类型
const {
  userFormateError,
  userAlreadyExistError,
  userRegisterError,
} = require("../constant/err.type");
//用户名和密码非空检查
const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
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
module.exports = {
  userValidator,
  userAlreadyExist,
  encryptPassword,
};
