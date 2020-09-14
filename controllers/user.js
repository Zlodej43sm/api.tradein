const { statusCodes } = require("../utils/constants");
const user = {};

user.notFound = (req, res) => {
  res.status(statusCodes.NOT_FOUND).send("Not found.");
};

user.allAccess = (req, res) => {
  res.status(statusCodes.OK).send("Public Content.");
};

user.userBoard = (req, res) => {
  res.status(statusCodes.OK).send("User Content.");
};

user.adminBoard = (req, res) => {
  res.status(statusCodes.OK).send("Admin Content.");
};

user.moderatorBoard = (req, res) => {
  res.status(statusCodes.OK).send("Moderator Content.");
};

module.exports = user;
