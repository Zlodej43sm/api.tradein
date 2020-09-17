const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { defaultInitRole } = require("../config/common");
const { ROLES } = require("../utils/constants");
const { Role, User } = require("../models");

const username = process.env.SU_USER_NAME;
const email = process.env.SU_USER_EMAIL;
const password = process.env.SU_USER_PASSWORD;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const dbConnect = mongoose.connection;
const initialRolesAndSu = async() => {
  try {
    const rolesCount = await Role.estimatedDocumentCount();
    if (!rolesCount) {
      for (roleKey in ROLES) {
        const name = ROLES[roleKey];

        await new Role({ name }).save();
        console.log(`Added ${name} to roles collection`);
        (name === defaultInitRole) && initialSuper();
      }
    }
  } catch ({ message }) {
    console.error(message);
  }
};
const initialSuper = async() => {
  try {
    const usersCount = await User.estimatedDocumentCount();
    if (!usersCount) {
      const userSuperRole = await Role.findOne({ name: defaultInitRole });
      const userData = {
        username,
        email,
        password: bcrypt.hashSync(password, 8),
        role: userSuperRole.get("_id")
      };
      await new User(userData).save();
      console.log(`Added super username/password - '${username}/${password}' to users collection`);
    }
  } catch ({ message }) {
    console.error(message);
  }
};

dbConnect.on("error", e => console.error(`MongoDB connection error: ${e}`));
dbConnect.once("open", () => {
  console.log("MongoDB connected!");
  initialRolesAndSu();
});
