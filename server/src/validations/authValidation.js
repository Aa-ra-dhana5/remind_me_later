const Joi = require('joi');

exports.signupValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

exports.loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
