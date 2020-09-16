const { checkSchema } = require("express-validator");
const { notEmpty, username, email, password } = require("../utils/validation");
const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require("../middlewares/verifySignUp");
const { signup, signin } = require("../controllers/auth");

const validateNotEmpty = Object.assign({}, notEmpty);
const validateUsername = Object.assign({}, notEmpty, username);
const validateEmail = Object.assign({}, notEmpty, email);
const validatePassword = Object.assign({}, notEmpty, password);

module.exports = app => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/v1/auth/signup",
    [
      checkSchema({
        username: validateUsername,
        email: validateEmail,
        password: validatePassword
      }),
      checkDuplicateUsernameOrEmail,
      checkRolesExisted,
    ],
    signup
  );

  app.post(
    "/v1/auth/signin",
    [
      checkSchema({
        password: validateNotEmpty,
        username: validateNotEmpty
      })
    ],
    signin
  );
};
