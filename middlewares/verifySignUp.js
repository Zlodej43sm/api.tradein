const { User } = require("../models");
const { ROLES, statusCodes } = require("../utils/constants");
const verifySignUp = {};

verifySignUp.checkDuplicateUsernameOrEmail = async({ body: { username, email } }, res, next) => {
  try {
    const isUsernameExist = await User.findOne({ username });
    const isEmailExist = await User.findOne({ email });

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

verifySignUp.checkRolesExisted = ({ body: { roles } }, res, next) => {
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        res.status(statusCodes.BAD_REQ).json({ message: "Role does not exist!" });
        return;
      }
    }
  }
  next();
};

module.exports = verifySignUp;
