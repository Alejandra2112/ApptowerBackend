const { validationResult, check } = require('express-validator')

const validateWatchman = [
  check('namewatchman')
    .isString()
    .withMessage('El campo "namewatchman" debe ser una cadena'),

  check('lastnamewatchman')
    .isString()
    .withMessage('El campo "lastnamewatchman" debe ser una cadena'),

  check('documentType')
    .isIn(['CC', 'CE'])
    .withMessage('El campo "documentType" debe ser "CC" o "CE'),

  check('document')
    .isString()
    .withMessage('El campo "document" debe ser una cadena')
    .isLength({ min: 8, max: 10 })
    .withMessage('El campo "document" debe tener entre 8 y 10 caracteres'),

  check('phone')
    .isString()
    .withMessage('El campo "phone" debe ser una cadena')
    .isLength({ min: 10, max: 10 })
    .withMessage('El campo "phone" debe tener 10 caracteres'),

  check('email')
    .isEmail()
    .withMessage('El campo "email" debe ser un correo electrónico válido'),
  check('dateOfbirth')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const millisecondsIn18Years = 18 * 365 * 24 * 60 * 60 * 1000;

      if (today - birthDate < millisecondsIn18Years) {
        throw new Error('Debes tener al menos 18 años');
      }

      return true;
    })
    .withMessage('El usuario debe tener al menos 18 años'),


  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next();
  },
];

module.exports = validateWatchman;
