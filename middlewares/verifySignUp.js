const { ROLES, statusCodes } = require("../utils/constants");
const { User } = require("../models");

const verifySignUp = {};

verifySignUp.checkDuplicateUsernameOrEmail = async({ body: { username, email } }, res, next) => {
  try {
    const isUsernameExist = await User.exists({ username });
    const isEmailExist = await User.exists({ email });

    if(isUsernameExist || isEmailExist) {
      const message = [];

      if (isUsernameExist) {
        message.push("Username is already in use!");
      }

      if (isEmailExist) {
        message.push("Email is already in use!");
      }
      
      res.status(statusCodes.BAD_REQ).json({ message });
    } else {
      next();
    }
  } catch ({ message }) {
    res.status(statusCodes.ERR).json({ message } );
  }
};

verifySignUp.checkRoleExisted = ({ body: { role } }, res, next) => {
  if (role) {
    const isRoleExist = ROLES[role];

    if (!isRoleExist) {
      res.status(statusCodes.BAD_REQ).json({ message: "Role does not exist!" });
      return;
    }
  }

  next();
};

module.exports = verifySignUp;
