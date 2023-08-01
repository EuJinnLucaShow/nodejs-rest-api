const { isValidObjectId } = require('mongoose');

const HttpError = require('../helpers/httpError');

const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not Invalid id`));
  }
  next();
};

module.exports = isValidId;
