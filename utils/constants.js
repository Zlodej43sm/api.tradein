const constants = {};

constants.ROLES = {
  superUser: "SU",
  partner: "P",
  department: "D",
  guest: "G",
  expert: "E",
  serviceManager: "SM" // read and comment
};
constants.statusCodes = {
  OK: 200,
  BAD_REQ: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  ERR: 500
};

module.exports = constants;
