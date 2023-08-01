const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody, isValidId, checkBody } = require('../../middlewares');

const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:id', isValidId, ctrl.getContactById);

router.post('/', checkBody, validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  '/:id',
  isValidId,
  checkBody,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.delete('/:id', isValidId, ctrl.removeContact);

router.patch(
  '/:id/favorite',
  isValidId,
  checkBody,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
