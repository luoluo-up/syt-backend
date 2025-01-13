const db = require("./db/mongodb");
const app = require("./app");
db(() => {
  const { PORT } = require("./config/config.default");
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});
module.exports = app;
