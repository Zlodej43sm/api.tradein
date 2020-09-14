const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require("../middlewares/verifySignUp");
const { signup, signin } = require("../controllers/auth");

module.exports = app => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/v1/auth/signup", [ checkDuplicateUsernameOrEmail, checkRolesExisted], signup);
  app.post("/v1/auth/signin", signin);
};
