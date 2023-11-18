const { Schema, model } = require("mongoose");
const { emailRegexp } = require("../regexp/email");
const { phoneRegexp } = require("../regexp/phone");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegexp,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versuionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
};
