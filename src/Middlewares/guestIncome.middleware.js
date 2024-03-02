const { body } = require('express-validator');

const postGuestIncomeValidations = [
  body('idVisitor').isInt().withMessage('El visitante es requerido'),
  body('idApartment').isInt().withMessage('El apartamento es requerido'),
  body('startingDate').isDate().withMessage('La fecha de inicio es requerida'),
  body('personAllowsAccess').isString().withMessage('La persona que permite el acceso es requerida'),
];

const putGuestIncomeValidations = [
  body('idGuest_income').isInt().withMessage('El ingreso de visitante es requerido')
  .notEmpty().withMessage('El ingreso de visitante es requerido'),
  body('departureDate').isDate().withMessage('La fecha de salida es requerida')
  .notEmpty(' La fecha de salida es requerida'),
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