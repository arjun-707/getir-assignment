const records = require("../controllers/records.controller");

module.exports = app => {
  app
    .route("/v1/records/counts")
    .post(
      records.getCounts
    );
};
