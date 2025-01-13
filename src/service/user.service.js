const UserModel = require("../model/user.model");
const moment = require("moment");
class UserService {
  async createUser(username, password) {
    const res = await UserModel.create({
      username,
      password,
      //为当前时间年月日时分秒 yy-mm-dd hh:mm:ss
      create_time: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    return res;
  }
}

module.exports = new UserService();
