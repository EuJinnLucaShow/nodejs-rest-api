const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody, checkBody, checkField } = require('../../middlewares');

const schemas = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:id', ctrl.getContactById);

router.post(
  '/',
  checkBody,
  checkField,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
  '/:id',
  checkBody,
  checkField,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.delete('/:id', ctrl.removeContact);

module.exports = router;
