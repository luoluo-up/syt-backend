const {
  findAllHospital,
  findHospitalByDictCode,
} = require("../service/home.service");
const {
  hospitalListError,
  hospitalLevelAndRegionError,
} = require("../constant/err.type");
class homeController {
  async hospitallist(ctx, next) {
    const { pageNo = 1, pageSize = 10 } = ctx.params;
    const { hostype, districtCode } = ctx.request.query; // 从查询参数获取 hostype 和 districtCode
    console.log(hostype, districtCode);
    console.log(22222222222);

    try {
      const result = await findAllHospital(
        pageNo,
        pageSize,
        hostype,
        districtCode
      );
      ctx.body = {
        code: 200,
        message: "查询医院列表成功",
        result,
      };
    } catch (error) {
      ctx.app.emit("error", hospitalListError, ctx);
    }
  }
  async hospitalLevelAndRegion(ctx, next) {
    const { dictCode } = ctx.params;
    try {
      const result = await findHospitalByDictCode(dictCode);
      ctx.body = {
        code: 200,
        message:
          dictCode === "hostype" ? "查询医院等级成功" : "查询医院地区成功",
        result,
      };
    } catch (error) {
      ctx.app.emit("error", hospitalLevelAndRegionError, ctx);
    }
  }
}
module.exports = new homeController();
