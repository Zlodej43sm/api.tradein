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
      
      res.status(statusCodes.BAD_REQ).send({ message });
    } else {
      next();
    }
  } catch ({ message, stack }) {
    res.status(statusCodes.ERR).send({ message, stack } );
  }
};

verifySignUp.checkRolesExisted = ({ body: { roles } }, res, next) => {
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        res.status(statusCodes.BAD_REQ).send({ message: "Role does not exist!" });
        return;
      }
    }
  }
  next();
};

module.exports = verifySignUp;
