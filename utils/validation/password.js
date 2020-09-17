module.exports = {
  in: ["body"],
  errorMessage: "Password should be combination of one uppercase, one lower case, one special char, one digit and min 7, max 50 char long",
  isLength: {
    options: {
      max: 50
    }
  },
  matches: {
    options: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/g]
  }
};
