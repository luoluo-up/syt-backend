const Router = require("koa-router");
const router = new Router({ prefix: "/home" });
const {
  hospitallist,
  hospitalLevelAndRegion,
  hospitalSearch,
  hospitalDetail,
  hospitalDepartment,
} = require("../controller/home.controller");
// 获取医院数据
router.get("/hoslist/:pageNo/:pageSize", hospitallist);
// 获取医院等级或地区数据
router.get("/hoslevelandregion/:dictCode", hospitalLevelAndRegion);
// 根据关键字搜索医院
router.get("/hossearch/:keyword", hospitalSearch);
// 获取医院详情数据
router.get("/detail/:hoscode", hospitalDetail);
//获取医院科室数据
router.get("/department/:hoscode", hospitalDepartment);
module.exports = router;
