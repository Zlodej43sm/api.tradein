const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Role } = require("../models");
const { ROLES, statusCodes } = require("../utils/constants");
const auth = {};

auth.signup = async({ body: { username, email, password, roles } }, res) => {
  const user = new User({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 8)
  });

  try {
    if (roles) {
      const userRole = await Role.find({ name: { $in: roles } });
      user.roles = userRole.map(role => role._id);
    } else {
      const userDefaultRole = await Role.findOne({ name: ROLES[3] });
      user.roles = [userDefaultRole._id];
    }

    await user.save();
    res.send({ message: "User was registered successfully!" });
  } catch ({ message, stack }) {
    res.status(statusCodes.ERR).send({ message, stack });
  }
};

auth.signin = async({ body: { username, password } }, res) => {
  try {
    const user = await User.findOne({ username })
      .populate("roles", "-__v");

    if (!user) {
      return res.status(statusCodes.NOT_FOUND).send({ message: "User Not found." });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(statusCodes.UNAUTHORIZED).send({ message: "Invalid Password!" });
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });
    const roles = [];

    for (let i = 0; i < user.roles.length; i++) {
      roles.push("ROLE_" + user.roles[i].name.toUpperCase());
    }

    res.status(statusCodes.OK).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles,
      accessToken
    });
  } catch ({ message, stack }) {
    res.status(statusCodes.ERR).send({ message, stack });
  }
};

module.exports = auth;
