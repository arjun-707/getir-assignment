const _ = require("lodash");
const md5 = require("md5");
const uuid = require("node-uuid");

const { SuccessResponse, ErrorResponse } = require(`./response`);

const isObject = (data) =>
  data instanceof Object && data.constructor.name == "Object";

const validateRequiredParams = (requiredFields, params) => {
  if (Array.isArray(requiredFields) && isObject(params)) {
    const receivedFields = _.intersection(_.keys(params), requiredFields);
    if (requiredFields.length === receivedFields.length) {
      for (let each in params) {
        if (
          requiredFields.indexOf(each) > -1 &&
          typeof params[each] == "string" &&
          params[each].length < 1
        )
          return false;
      }
      return params;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
const uniqueId = () => md5(`${+new Date()}${uuid.v4()}`);

module.exports = {
  SuccessResponse,
  ErrorResponse,
  isObject,
  validateRequiredParams,
  uniqueId
};
