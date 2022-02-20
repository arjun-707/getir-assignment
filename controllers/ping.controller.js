const { SuccessResponse } = require(`../utils`);

const test = (req, res) => SuccessResponse(res, 'ok', [], "ping")

module.exports = {
  test
}