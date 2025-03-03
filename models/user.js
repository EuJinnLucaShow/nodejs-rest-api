const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegexp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Set email for contact'],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for contact'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegexp)).required().messages({
    'string.pattern.base': `Invalid email format`,
    'any.required': `Missing required email field`,
  }),
  password: Joi.string().min(6).required().messages({
    'string.password': `Invalid password format`,
    'any.required': `Missing required password field`,
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegexp)).required().messages({
    'string.pattern.base': `Invalid email format`,
    'any.required': `Missing required email field`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegexp)).required().messages({
    'string.pattern.base': `Invalid email format`,
    'any.required': `Missing required email field`,
  }),
  password: Joi.string().min(6).required().messages({
    'string.password': `Invalid password format`,
    'any.required': `Missing required password field`,
  }),
});

const schemas = { registerSchema, emailSchema, loginSchema };

const User = model('user', userSchema);

module.exports = { User, schemas };
