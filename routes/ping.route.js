const ping = require('../controllers/ping.controller')
module.exports = app => {
  app.route("/v1/ping").get(ping.test);
};
