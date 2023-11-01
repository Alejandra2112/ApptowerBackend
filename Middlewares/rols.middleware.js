const { validationResult, check } = require('express-validator');

const validateRols = [
  check('namerole')
    .isString()
    .withMessage('El campo "namerole" debe ser una cadena'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next();
  },
];

module.exports = validateRols;
