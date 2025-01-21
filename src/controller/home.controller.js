const {
  findAllHospital,
  findHospitalByDictCode,
  findHospitalBykeyword,
} = require("../service/home.service");
const {
  hospitalListError,
  hospitalLevelAndRegionError,
  hospitalSearchError,
} = require("../constant/err.type");
class homeController {
  async hospitallist(ctx, next) {
    const { pageNo = 1, pageSize = 10 } = ctx.params;
    const { hostype, districtCode } = ctx.request.query; // 从查询参数获取 hostype 和 districtCode
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
  async hospitalSearch(ctx, next) {
    const { keyword } = ctx.params;
    try {
      const result = await findHospitalBykeyword(keyword); // 调用 findHospitalBykeyword 方法查询医院信息
      ctx.body = {
        code: 200,
        message: "搜索医院信息成功",
        result,
      };
    } catch (error) {
      console.log(error);
      ctx.app.emit("error", hospitalSearchError, ctx);
    }
  }
}
module.exports = new homeController();
