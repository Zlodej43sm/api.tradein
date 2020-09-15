const { verifyToken, isModerator, isAdmin } = require("../middlewares/auth");
const { notFound, allAccess, adminBoard, userBoard, moderatorBoard } = require("../controllers/user");

module.exports = app => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/", notFound);
  app.get("/v1/test/all", allAccess);
  app.get("/v1/test/user", [verifyToken], userBoard);
  app.get("/v1/test/mod", [verifyToken, isModerator], moderatorBoard);
  app.get("/v1/test/admin", [ verifyToken, isAdmin], adminBoard);
};
