const jwt = require("jsonwebtoken");

const { ROLES, statusCodes } = require("../utils/constants");
const { User } = require("../models");

const auth = {};

auth.verifyToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(statusCodes.FORBIDDEN).json({ message: "No token provided!" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(statusCodes.UNAUTHORIZED).json({ message: "Unauthorized!" });
      }

      req.userId = decoded.id;
      next();
    });
  } catch ({ message }) {
    res.status(statusCodes.ERR).json({ message });
  }
};

auth.isAdmin = async({ userId }, res, next) => {
  try {
    const user = await User.findById(userId).populate("role");
    const { name: roleName } = user.get("role");

    if (ROLES.superUser === roleName) {
      next();
      return;
    }

    res.status(statusCodes.FORBIDDEN).json({ message: "Require Admin Role!" });
  } catch ({ message }) {
    res.status(statusCodes.ERR).json({ message });
  }
};

module.exports = auth;
