const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Role } = require("../models");
const { ROLES, statusCodes } = require("../utils/constants");
const { validateRequest } = require("../utils");
const auth = {};

auth.signup = async(req, res) => {
  try {
    validateRequest(req, res);
    const { body: { username, email, password, roles } } = req;
    const user = new User({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8)
    });
    if (roles) {
      const userRole = await Role.find({ name: { $in: roles } });
      user.roles = userRole.map(role => role._id);
    } else {
      const userDefaultRole = await Role.findOne({ name: ROLES[3] });
      user.roles = [userDefaultRole._id];
    }

    await user.save();
    res.status(statusCodes.OK).json({ message: "User was registered successfully!" });
  } catch ({ message }) {
    res.status(statusCodes.ERR).json({ message });
  }
};

auth.signin = async(req, res) => {
  try {
    validateRequest(req, res);
    const { body: { username, password } } = req;
    const user = await User.findOne({ username })
      .populate("roles");

    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({ message: "User Not found" });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(statusCodes.BAD_REQ).json({ message: "Invalid Password!" });
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });
    const roles = user.roles.map(({ name }) => `ROLE_${name.toUpperCase()}`);

    res.status(statusCodes.OK).json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles,
      accessToken
    });
  } catch ({ message }) {
    res.status(statusCodes.ERR).json({ message });
  }
};

module.exports = auth;
