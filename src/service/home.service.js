const HospitalModel = require("../model/hospital.model");
const RegionModel = require("../model/region.model");
const LevelModel = require("../model/level.model");
const HosinfoModel = require("../model/hosinfo.model");
const DepartmentModel = require("../model/hosdepartment.model");
class HomeService {
  async findAllHospital(pageNo, pageSize, hostype, districtCode) {
    try {
      // 构建查询条件
      const query = {};
      if (hostype) {
        query.hostype = hostype; // 如果 hostype 存在，则添加到查询条件
      }
      if (districtCode) {
        query.districtCode = districtCode; // 如果 districtCode 存在，则添加到查询条件
      }

      // 计算符合条件的总文档数
      const total = await HospitalModel.countDocuments(query);

      // 计算要跳过的文档数量
      const skip = (pageNo - 1) * pageSize;

      // 获取分页数据
      const list = await HospitalModel.find(query).skip(skip).limit(pageSize);

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
  // 异步函数，根据关键字搜索医院
  async findHospitalBykeyword(keyword) {
    try {
      // 使用正则表达式搜索医院名称、地址和介绍
      const result = await HospitalModel.find({
        $or: [
          { name: { $regex: keyword } }, // 根据医院名称搜索
        ],
      });
      return result;
    } catch (error) {
      // 返回错误信息
      return {
        success: false,
        message: "获取医院数据时出错", // 返回错误信息
        error,
      };
    }
  }
  async findHospitalDetail(hoscode) {
    try {
      const result = await HosinfoModel.findOne({ hoscode });
      return result;
    } catch (error) {
      return {
        success: false,
        message: "获取医院详情时出错", // 返回错误信息
        error,
      };
    }
  }
  async findHospitalDepartment(hoscode) {
    try {
      const result = await DepartmentModel.findOne({ hoscode });
      return result;
    } catch (error) {
      return {
        success: false,
        message: "获取医院科室时出错", // 返回错误信息
        error,
      };
    }
  }
}
module.exports = new HomeService();
