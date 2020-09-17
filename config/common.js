const { ROLES } = require("../utils/constants");

const config = {};

config.defaultRole = ROLES.guest;
config.defaultInitRole = ROLES.superUser;

module.exports = config;
