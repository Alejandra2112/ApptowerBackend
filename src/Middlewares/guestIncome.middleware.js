const { check } = require('express-validator');

const postGuestIncomeValidations = [
  check('idVisitor').isInt().withMessage('El visitante es requerido')
  .notEmpty().withMessage('El visitante es requerido')
  .isLength({min: 1}).withMessage('El visitante es requerido'),

  check('idApartment').isInt().withMessage('El apartamento es requerido')
  .notEmpty().withMessage('El apartamento es requerido')
  .isLength({min: 1}).withMessage('El apartamento es requerido'),
  check('startingDate').notEmpty().withMessage('La fecha de inicio es requerida')
  .custom((value) => {
    if (isNaN(Date.parse(value))) {
      throw new Error(`La fecha de pago debe ser valida, recibido: ${value}`);
    }
    const paymentDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (paymentDate < currentDate) {
      throw new Error(`La fecha de pago no puede ser anterior al día actual`);
    }
    return true;
  }),
  check('personAllowsAccess').isString().withMessage('La persona que permite el acceso es requerida')
  .notEmpty().withMessage('La persona que permite el acceso es requerida')
  .isLength({min: 3}).withMessage('La persona que permite el acceso es requerida'),
];

const putGuestIncomeValidations = [
  check('idGuest_income').isInt().withMessage('El ingreso de visitante es requerido')
  .notEmpty().withMessage('El ingreso de visitante es requerido'),
  check('departureDate').custom((value) => {
    if (isNaN(Date.parse(value))) {
      throw new Error(`La fecha de salida debe ser valida, recibido: ${value}`);
    }
    const departureDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (departureDate < currentDate) {
      throw new Error(`La fecha de salida no puede ser anterior al día actual`);
    }
    return true;
  })
  .notEmpty().withMessage('La fecha de salida es requerida'),
];

module.exports = {
  postGuestIncomeValidations,
  putGuestIncomeValidations
};

// const {check, validationResult} = require('express-validator');


// const validateResult = (req, res, next) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array()});
//     }
//     next();
// };

// const postValidationGuestIncome = [
//     check('idVisitor', 'Visitor is required or its value is invalid').not().isEmpty().isInt(),
//     check('idApartment', 'Apartment is required or its value is invalid').not().isEmpty().isInt(),
//     check('startingDate', 'Starting date is required or its value is invalid').not().isEmpty().isISO8601(),
//     check('personAllowsAccess', 'Personal allows access is required or its value is invalid').not().isEmpty().isString().isLength({min: 3, max: 50}),
//     ( req, res, next ) => {
//         validateResult(req, res, next);
//     }
// ];

// const putValidationGuestIncome = [
//     check('idGuest_income', 'Guest income is required or its value is invalid').not().isEmpty().isInt(),
//     check('departureDate', 'Departure date is required or its value is invalid').not().isEmpty().isISO8601(),
//     ( req, res, next ) => {
//         validateResult(req, res, next);
//     }
// ];

// module.exports = {
//     postValidationGuestIncome,
//     putValidationGuestIncome,
// };