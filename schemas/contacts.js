const Joi = require('joi');

const regexString = '^[A-Z][a-z]+ [A-Z][a-z]+$';
const regexPhone = '^[0-9]{3}-[0-9]{3}-[0-9]{4}$';

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp(regexString))
    .message('Name must be in format: FirstName LastName')
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(new RegExp(regexPhone))
    .message('Phone number must be in format: 000-000-0000')
    .required(),
});

module.exports = {
  addSchema,
};
