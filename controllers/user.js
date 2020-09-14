const { statusCodes } = require("../utils/constants");

exports.notFound = (req, res) => {
  res.status(statusCodes.NOT_FOUND).send("Not found.");
};

exports.allAccess = (req, res) => {
  res.status(statusCodes.OK).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(statusCodes.OK).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(statusCodes.OK).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(statusCodes.OK).send("Moderator Content.");
};
