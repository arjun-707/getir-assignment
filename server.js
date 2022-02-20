require("./configs/globals");

const express = require("express");
const { createServer } = require("http");
const {
  initMiddleware,
  finalMiddleware,
} = require("./middleware/app.middleware");
const { connectMongo } = require("./lib/mongo");
const { initRoutes } = require("./routes");

const app = express();
const server = createServer(app);
      
const startApp = async () => {
  __print("*********** STARTING *************");
  await connectMongo().catch(__exit_app);

  initMiddleware(app);
  initRoutes(app);
  finalMiddleware(app);
  server.listen(PORT, (_) => __debug(`[**] App listening at ${PORT}`));
};
startApp()
  .then((_) => __print("************** STARTED ***********"))
  .catch((ex) => {
    __print_error(ex.stack);
  });
