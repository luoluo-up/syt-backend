const { findAllHospital } = require("../service/home.service");
const { hospitalListError } = require("../constant/err.type");
class homeController {
  async hospitallist(ctx, next) {
    const { pageNo = 1, pageSize = 10 } = ctx.params;
    try {
      const result = await findAllHospital(pageNo, pageSize);
      ctx.body = {
        code: 200,
        message: "查询医院列表成功",
        result,
      };
    } catch (error) {
      ctx.app.emit("error", hospitalListError, ctx);
    }
  }
}
module.exports = new homeController();
