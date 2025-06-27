const db = require("./db/mongodb");
const app = require("./app");
const { PORT } = require("./config/config.default");

// 连接数据库并启动服务器
db(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});

// 导出 app 以便在其他地方使用
module.exports = app;
