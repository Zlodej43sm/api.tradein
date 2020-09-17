const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { defaultRole } = require("../config/common");
const { statusCodes } = require("../utils/constants");
const { validateRequest } = require("../utils");
const { User, Role } = require("../models");

const auth = {};

auth.signup = async(req, res) => {
  try {
    validateRequest(req, res);

    const { body: { username, email, password, role } } = req;
    const roleName = role || defaultRole;
    const userRole = await Role.findOne({ name: roleName });
    const userData = {
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
      role: userRole.get("_id")
    };

    await User(userData).save();
    res.status(statusCodes.OK).json({ message: "User was registered successfully!" });
  } catch ({ message }) {
    res.status(statusCodes.ERR).json({ message });
  }
};

auth.signin = async(req, res) => {
  try {
    validateRequest(req, res);

    const { body: { email, password } } = req;
    const user = await User.findOne({ email }).populate("role");
    const { name: roleName  } = user.get("role");

    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({ message: "User Not found" });
    }

    const isValidPassword = bcrypt.compareSync(password, user.get("password"));

    if (!isValidPassword) {
      return res.status(statusCodes.BAD_REQ).json({ message: "Invalid Password!" });
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });
    const bodyRes = {
      accessToken,
      id: user.get("_id"),
      username: user.get("username"),
      email: user.get("email"),
      role: `role_${roleName.toLowerCase()}`
    };

    res.status(statusCodes.OK).json(bodyRes);
  } catch ({ message }) {
    res.status(statusCodes.ERR).json({ message });
  }
};

module.exports = auth;
