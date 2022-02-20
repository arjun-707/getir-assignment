const { httpCodes } = require("./http-codes");
const { successMsg, errorMsg } = require("./messages");
const util = require("util");
const SUCCESS = {
  msg: httpCodes.success.msg,
  code: httpCodes.success.code,
  status: true,
  records: [],
};
const ERROR = {
  msg: httpCodes.internal.msg,
  code: httpCodes.internal.code,
  status: false,
  description: null,
};

exports.SuccessResponse = (
  RESPONSE,
  code,
  data,
  message = null,
  source = null
) => {
  if (!data) throw new Error(`message required to send response to client`);
  if (!httpCodes[code]) throw new Error(`http code not found for ${code}`);
  if (!RESPONSE || !RESPONSE instanceof Object)
    throw new Error(`response object required`);
  SUCCESS.msg = successMsg[message]
    ? source
      ? util.format(successMsg[message], source)
      : successMsg[message]
    : httpCodes[code].msg;
  SUCCESS.code = Number(httpCodes[code].code);
  SUCCESS.records = data;
  return RESPONSE.status(SUCCESS.code === 0? 200: SUCCESS.code).send(SUCCESS);
};
exports.ErrorResponse = (
  RESPONSE,
  code,
  message = null,
  description = null,
  source = null
) => {
  if (!httpCodes[code]) throw new Error(`Error: http code not found for ${code}`);
  if (!RESPONSE) throw new Error(`response object required`);
  ERROR.msg = errorMsg[message]
    ? source
      ? util.format(errorMsg[message], source)
      : errorMsg[message]
    : httpCodes[code].msg;
  ERROR.code = Number(httpCodes[code].code);
  ERROR.description = description;
  return RESPONSE.status(ERROR.code).send(ERROR);
};
