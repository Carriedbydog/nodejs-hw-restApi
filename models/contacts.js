const { Schema, model } = require("mongoose");
const emailRegexp = require("../regexp/email");
const phoneRegexp = require("../regexp/phone");
const { handleSaveErrors } = require("../helpers");
const mongoosePaginate = require("mongoose-paginate");

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versuionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

contactSchema.plugin(mongoosePaginate);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
};
