const { checkSchema } = require("express-validator");

const { notEmpty, username, email, password } = require("../utils/validation");
const { checkDuplicateUsernameOrEmail, checkRoleExisted } = require("../middlewares/verifySignUp");
const { signup, signin } = require("../controllers/auth");

const validateNotEmpty = Object.assign({}, notEmpty);
const validateUsername = Object.assign({}, notEmpty, username);
const validateEmail = Object.assign({}, notEmpty, email);
const validatePassword = Object.assign({}, notEmpty, password);

module.exports = app => {
  app.post(
    "/v1/auth/signup",
    [
      checkSchema({
        username: validateUsername,
        email: validateEmail,
        password: validatePassword
      }),
      checkDuplicateUsernameOrEmail,
      checkRoleExisted,
    ],
    signup
  );

  app.post(
    "/v1/auth/signin",
    [
      checkSchema({
        email: validateNotEmpty,
        password: validateNotEmpty
      })
    ],
    signin
  );
};
