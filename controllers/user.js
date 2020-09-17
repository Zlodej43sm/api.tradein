const { statusCodes } = require("../utils/constants");

const user = {};

user.notFound = (req, res) => {
  res.status(statusCodes.NOT_FOUND).json("Not found.");
};

user.adminBoard = (req, res) => {
  res.status(statusCodes.OK).json("Admin Content.");
};


module.exports = user;
