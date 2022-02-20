const RecordService = require('../services/records.service')
const { SuccessResponse, ErrorResponse, isObject } = require(`../utils`);

const getCounts = async (req, res) => {
  if (!req.body.startDate)
    return ErrorResponse(res, "badRequest", "invalid", "startDate");
  if (!req.body.endDate)
    return ErrorResponse(res, "badRequest", "invalid", "endDate");
  if (!req.body.minCount)
    return ErrorResponse(res, "badRequest", "invalid", "minCount");
  if (!req.body.maxCount)
    return ErrorResponse(res, "badRequest", "invalid", "maxCount");
  try {
    const records = await RecordService.getCounts(req.body)
    return SuccessResponse(res, "success", records)
  } catch (ex) {
    return ErrorResponse(res, "internal", "wrong", ex.message);
  }
}
module.exports = {
  getCounts
}