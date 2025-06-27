const UserModel = require("../model/user.model");
const moment = require("moment");
class UserService {
  async getUserInfo({ phone }) {
    try {
      // Mongoose 正确用法（无 where 子句）
      const user = await UserModel.findOne({ phone });

      if (!user) {
        console.log("用户不存在");
        return {
          success: false,
          message: "用户不存在",
        };
      }

      return user;
    } catch (error) {
      console.error("用户查询错误:", error);
      return {
        success: false,
        message: "用户查询失败",
        error: error.message,
      };
    }
  }
  async createUser(userData) {
    try {
      const res = await UserModel.create({
        username: userData.username,
        password: userData.password,
        phone: userData.phone,
        email: userData.email,
        code: userData.code,
        create_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
      console.log("创建用户成功:", res.dataValues);
      return res;
    } catch (error) {
      console.error("用户创建错误:", error);
      return {
        success: false,
        message: "用户创建失败",
        error,
      };
    }
  }
  async findSmsCode(phone, code) {
    try {
      await UserModel.findOneAndUpdate(
        { phone },
        { code, createdAt: new Date() },
        { upsert: true, new: true }
      );
    } catch (error) {
      // 存储验证码时出错
      return {
        success: false,
        message: "存储验证码时出错",
        error,
      };
    }
  }
}
module.exports = new UserService();
