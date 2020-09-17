const { verifyToken, isAdmin } = require("../middlewares/auth");
const { notFound, adminBoard } = require("../controllers/user");

module.exports = app => {
  app.get("/", notFound);
  app.get("/v1/test/admin", [verifyToken, isAdmin], adminBoard);
};
