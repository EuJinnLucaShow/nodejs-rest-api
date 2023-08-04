const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
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
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
  password: Joi.string().min(6).required(),
});

const schemas = { registerSchema, loginSchema };

const User = model('user', userSchema);

module.exports = { User, schemas };
