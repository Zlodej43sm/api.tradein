const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 255
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
});
const User = model("User", userSchema);

module.exports = User;

