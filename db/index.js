const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Role, User } = require("../models");
const { ROLES } = require("../utils/constants");
const username = process.env.SU_USER_NAME;
const email = process.env.SU_USER_EMAIL;
const password = process.env.SU_USER_PASSWORD;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const index = mongoose.connection;

index.on("error", e => console.error(`MongoDB connection error: ${e}`));
index.once("open", () => {
  console.log("MongoDB connected!");
  initialSuRole();
  initialSuper();
});

function initialSuRole() {
  Role.estimatedDocumentCount(async(err, count) => {
    if (!err && count === 0) {
      let rolesCount = 0;
      while (rolesCount < ROLES.length) {
        const name = ROLES[rolesCount];
        await new Role({ name })
          .save(e => {
            const msg = e ? `error: ${e}` : `Added ${name} to roles collection`;
            console.error(msg);
          });
        rolesCount++;
      }
    }
  });
}

function initialSuper() {
  User.estimatedDocumentCount(async(err, count) => {
    if (!err && count === 0) {
      const userSuperRole = await Role.findOne({ name: ROLES[0] });
      new User({
        username,
        email,
        password: bcrypt.hashSync(password, 8),
        roles: [userSuperRole._id]
      }).save(e => {
        const msg = e ? `error: ${e}` : `Added super username/password - '${username}/${password}' to users collection`;
        console.error(msg);
      });
    }
  });
}
