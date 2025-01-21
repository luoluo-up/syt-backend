const HospitalModel = require("../model/hospital.model");
const RegionModel = require("../model/region.model");
const LevelModel = require("../model/level.model");
class HomeService {
  async findAllHospital(pageNo, pageSize) {
    try {
      //   需要返回的数据有pageNo,pageSize, total, list
      const total = await HospitalModel.countDocuments();
      // 获取分页数据
      // 计算要跳过的文档数量
      const skip = (pageNo - 1) * pageSize;
      const list = await HospitalModel.find().skip(skip).limit(pageSize);
      return { pageNo, pageSize, total, list };
    } catch (error) {
      return {
        success: false,
        message: "获取医院数据时出错", // 返回错误信息
        error: error,
      };
    }
  }
  async findHospitalByDictCode(dictCode) {
    try {
      if (dictCode === "region") {
        const result = await RegionModel.find();
        return result;
      } else if (dictCode === "hostype") {
        const result = await LevelModel.find();
        return result;
      }
    } catch (error) {
      return {
        success: false,
        message:
          dictCode == "region" ? "获取地区数据时出错" : "获取等级数据时出错", // 返回错误信息
        error: error,
      };
    }
  }
}

module.exports = new HomeService();
