const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const emailRegexp = require("../regexp/email");
const allowedSubscriptions = require("../regexp/allowedSubscriptions");

const userSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: emailRegexp,
    unique: true,
  },
  subscription: {
    type: String,
    enum: allowedSubscriptions,
    default: "starter",
  },
  token: {
    type: String,
    default: "",
  },
  avatarURL: {
    type: String,
    required: true,
  },
});

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

module.exports = {
  User,
};
