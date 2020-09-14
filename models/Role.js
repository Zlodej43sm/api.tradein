const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  }
});
const Role = model("Role", roleSchema);

module.exports = Role;

