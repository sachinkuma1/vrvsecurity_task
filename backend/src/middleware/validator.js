
// File: src/middleware/validator.js
const { AppError } = require('../utils/errorHandler');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }
    next();
  };
};

module.exports = validate;
