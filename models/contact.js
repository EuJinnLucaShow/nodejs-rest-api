const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const regexString = '^[A-Z][a-z]+ [A-Z][a-z]+$';
const regexPhone = '^[0-9]{3}-[0-9]{3}-[0-9]{4}$';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp(regexString))
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
  phone: Joi.string().pattern(new RegExp(regexPhone)).required().messages({
    'string.pattern.base': `Phone number must be in format: 000-000-0000`,
    'any.required': `Missing required phone field`,
  }),
  favorite: Joi.boolean().optional(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ 'any.required': `Missing field favorite` }),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};
