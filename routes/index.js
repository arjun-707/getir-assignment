const glob = require("glob");

exports.initRoutes = (app) => {
  const routers = glob.sync(__root_path(`/routes/*.route.js`));
  routers.forEach((route) => {
    if (DEBUG === true) __print(route);
    require(route)(app);
  });
};
