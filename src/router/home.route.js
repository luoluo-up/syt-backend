const Router = require("koa-router");
const router = new Router({ prefix: "/home" });
const { hospitallist } = require("../controller/home.controller");
router.get("/hoslist/:pageNo/:pageSize", hospitallist);
module.exports = router;
