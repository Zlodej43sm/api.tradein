const { statusCodes } = require("../utils/constants");
const user = {};

user.notFound = (req, res) => {
  res.status(statusCodes.NOT_FOUND).json("Not found.");
};

user.allAccess = (req, res) => {
  res.status(statusCodes.OK).json("Public Content.");
};

user.userBoard = (req, res) => {
  res.status(statusCodes.OK).json("User Content.");
};

user.adminBoard = (req, res) => {
  res.status(statusCodes.OK).json("Admin Content.");
};

user.moderatorBoard = (req, res) => {
  res.status(statusCodes.OK).json("Moderator Content.");
};

module.exports = user;
