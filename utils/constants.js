const constants = {};

constants.ROLES = ["super", "admin", "moderator", "user"];
constants.statusCodes = {
  OK: 200,
  BAD_REQ: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  ERR: 500
};

module.exports = constants;
