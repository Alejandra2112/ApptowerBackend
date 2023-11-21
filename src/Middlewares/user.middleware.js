const { validationResult, check } = require('express-validator');
const Rols = require('../Models/rols.model');
const User = require('../Models/users.model');

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
    .custom(async (value, { req }) => {
      if (typeof value === 'undefined' || value === null) {
        value = 2;
        req.body.idrole = 2;
        req.body.state = 'Inactivo';
      }
      const existingRol = await Rols.findOne({ where: { idrole: value } });
      if (!existingRol) {
        throw new Error('No existe el rol');
      }
      return true;
    }),

  check('password')
    .isLength({ min: 8, max: 12 })
    .withMessage('El campo "password" debe tener al menos 8 a 12 caracteres'),


  check('email')
    .isEmail()
    .withMessage('El campo "email" debe ser un correo electrónico válido'),

  check('phone')
    .isString()
    .isLength({ min: 10, max: 10 })
    .optional()
    .withMessage('El campo "phone" debe ser una cadena de 10 caracteres'),


  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateUser;
