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
    .withMessage('El campo "document" debe ser una cadena de 8 a 10 caracteres')
    .custom(async (value) => {
      const existingDocument = await User.findOne({ where: { document: value } });

      if (existingDocument) {
        throw new Error('El documento ya se encuentra asignado a un usuario');
      }
      return true;
    }),


  check('name')
    .isString()
    .withMessage('El campo "name" debe ser una cadena'),

  check('lastname')
    .isString()
    .withMessage('El campo "lastname" debe ser una cadena'),

  check('idrole')
    .custom(async (value) => {
      if (typeof value === 'undefined') {
        req.body.idrole = 2;
        return true;
      }
      const existingRol = await Rols.findOne({ where: { idrole: value } });

      if (!existingRol) {
        throw new Error('No existe el rol');
      }
    }),


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
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateUser;
