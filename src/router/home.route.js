const Router = require("koa-router");
const router = new Router({ prefix: "/home" });
const {
  hospitallist,
  hospitalLevelAndRegion,
  hospitalSearch,
} = require("../controller/home.controller");
// 获取医院数据
router.get("/hoslist/:pageNo/:pageSize", hospitallist);
// 获取医院等级或地区数据
router.get("/hoslevelandregion/:dictCode", hospitalLevelAndRegion);
// 根据关键字搜索医院
router.get("/hossearch/:keyword", hospitalSearch);
module.exports = router;
