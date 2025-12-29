const app = require("./src/api/app");
const port = process.env.PORT;
const logger = require("./src/utilities/logging");

app.listen(port, () => {
  logger.info(`IDE-server app listening on port ${port}`);
});

module.exports = app;