const Joi = require('joi');

// const regexString = '^[A-Z][a-z]+ [A-Z][a-z]+$';
// const regexPhone = '^[0-9]{3}-[0-9]{3}-[0-9]{4}$';

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    // .pattern(new RegExp(regexString))
    .required()
    .messages({
      'string.pattern.base': `Name must be in format: FirstName LastName`,
      'any.required': `Missing required name field`,
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required()
    .messages({
      'string.email': `Invalid email format`,
      'any.required': `Missing required email field`,
    }),
  phone: Joi.string()
    // .pattern(new RegExp(regexPhone))
    .required()
    .messages({
      'string.pattern.base': `Phone number must be in format: 000-000-0000`,
      'any.required': `Missing required phone field`,
    }),
  favorite: Joi.boolean().optional(),
});

module.exports = {
  addSchema,
};
