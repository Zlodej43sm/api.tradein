module.exports = {
  in: ["body"],
  isLength: {
    errorMessage: "Username should be max 50 char long",
    options: {
      max: 50
    }
  }
};
