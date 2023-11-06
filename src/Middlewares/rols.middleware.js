const { validationResult, check } = require('express-validator');

const validateRols = [
  check('namerole')
    .isString()
    .withMessage('El campo "namerole" debe ser una cadena'),

  check('permissions')
    .isArray({ min: 1 })
    .withMessage('Debes proporcionar al menos un permiso'),

  check('privileges')
    .isArray({ min: 1 })
    .withMessage('Debes proporcionar al menos un privilegio'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next();
  },
];

module.exports = validateRols;
