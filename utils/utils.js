const { statusCodes } = require("./constants");

/**
 * Check if entity for duplicates
 * @param {string} e - response error message
 * @param {object} entity - DB entity
 * @param {string} name - entity type name
 */
function checkDuplicates(e, entity, name) {
  if (e) {
    res.status(statusCodes.ERR).send({ message: e });
    return;
  }

  if (entity) {
    res.status(statusCodes.BAD_REQ).send({ message: `Failed! ${name} is already in use!` });
    return;
  }
}
