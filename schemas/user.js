const Joi = require("joi");
const emailRegexp = require("../regexp/email");
const allowedSubscriptions = require("../regexp/allowedSubscriptions");

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...allowedSubscriptions)
    .required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
};

module.exports = { schemas };
