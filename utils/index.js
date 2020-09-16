const { validationResult } = require("express-validator");

const utils = {};

utils.validateRequest = req => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors.array().map(error => `${error.param}: ${error.msg}`);
    throw new Error(message);
  }
};

module.exports = utils;
