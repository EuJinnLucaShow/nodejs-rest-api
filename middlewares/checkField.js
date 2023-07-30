const { HttpError } = require('../helpers');

const checkField = (req, res, next) => {
  const body = req.body;
  const requiredFields = ['name', 'email', 'phone'];

  const missingField = requiredFields.find(field => !(field in body));
  if (missingField) {
    const errorMessage = `missing required ${missingField} field`;
    throw HttpError(400, errorMessage);
  }
  next();
};

module.exports = checkField;
