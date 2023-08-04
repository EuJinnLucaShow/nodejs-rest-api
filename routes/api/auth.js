const express = require('express');

const ctrl = require('../../controllers/auth');

const { validateBody, checkBody } = require('../../middlewares');

const router = express.Router();

const { schemas } = require('../../models/user');

router.post(
  '/users/register',
  checkBody,
  validateBody(schemas.registerSchema),
  ctrl.register
);

router.post(
  '/users/login',
  checkBody,
  validateBody(schemas.loginSchema),
  ctrl.login
);

module.exports = router;
