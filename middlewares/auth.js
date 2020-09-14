const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");
const { ROLES, statusCodes } = require("../utils/constants");
const auth = {};

auth.verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(statusCodes.FORBIDDEN).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(statusCodes.UNAUTHORIZED).send({ message: "Unauthorized!" });
    }

    req.userId = decoded.id;
    next();
  });
};

auth.isAdmin = async({ userId }, res, next) => {
  try {
    const { roles } = await User.findById(userId);
    const targetRoles = await Role.find({ _id: { $in: roles } });

    for (let i = 0; i < targetRoles.length; i++) {
      const { name } = targetRoles[i];
      if (name === ROLES[0] || name === ROLES[1]) {
        next();
        return;
      }
    }

    res.status(statusCodes.FORBIDDEN).send({ message: "Require Admin Role!" });
  } catch ({ message, stack }) {
    res.status(statusCodes.ERR).send({ message, stack });
  }
};

auth.isModerator = async({ userId }, res, next) => {
  try {
    const { roles } = await User.findById(userId);
    const targetRoles = await Role.find({ _id: { $in: roles } });

    for (let i = 0; i < targetRoles.length; i++) {
      const { name } = targetRoles[i];
      if (name === ROLES[2]) {
        next();
        return;
      }
    }

    res.status(statusCodes.FORBIDDEN).send({ message: "Require Moderator Role!" });
  } catch ({ message, stack }) {
    res.status(statusCodes.ERR).send({ message, stack });
  }
};

module.exports = auth;