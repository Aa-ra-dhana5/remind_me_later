const Joi = require("joi");

const reminderSchema = Joi.object({
  message: Joi.string().required(),
  date: Joi.date().required(),
  type: Joi.string().valid("email", "sms", "both").required(),

  email: Joi.alternatives().conditional("type", {
    is: Joi.valid("email", "both"),
    then: Joi.string().email().required(),
    otherwise: Joi.forbidden(),
  }),

  phone: Joi.alternatives().conditional("type", {
    is: Joi.valid("sms", "both"),
    then: Joi.string()
      .pattern(/^[6-9]\d{9}$/) // For Indian numbers
      .required(),
    otherwise: Joi.forbidden(),
  }),
});

module.exports = reminderSchema;
