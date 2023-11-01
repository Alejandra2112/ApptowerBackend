const { validationResult, check } = require('express-validator');

const validateUser = [
  check('documentType')
    .isIn(['CC', 'CE'])
    .withMessage('El campo "documentType" debe ser "CC" o "CE'),

  check('document')
    .isString()
    .isLength({ min: 8, max: 10 })
    .withMessage('El campo "document" debe ser una cadena de 8 a 10 caracteres'),

  check('name')
    .isString()
    .withMessage('El campo "name" debe ser una cadena'),

  check('lastname')
    .isString()
    .withMessage('El campo "lastname" debe ser una cadena'),

  check('idrole')
    .custom((value, { req }) => {
      if (typeof value === 'undefined') {
        req.body.idrole = 2;
        return true;
      }
      return value === 1 || value === 2 || value === 3;
    })
    .withMessage('El campo "idrole" debe ser 1"Administrador", 2"Residente" o 3"Vigilante"'),

  check('email')
    .isEmail()
    .withMessage('El campo "email" debe ser un correo electrónico válido'),

  check('phone')
    .isString()
    .isLength({ min: 10, max: 10 })
    .optional()
    .withMessage('El campo "phone" debe ser una cadena de 10 caracteres'),

  check('password')
    .isLength({ min: 8, max: 12 })
    .withMessage('El campo "password" debe tener entre 8 y 12 caracteres'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    next();
  },
];

module.exports = { validateUser };
