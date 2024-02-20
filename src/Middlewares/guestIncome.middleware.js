const yup = require('yup');

//Se crea el esquema de validación para el método POST
const postGuestIncomeSchema = yup.object().shape({
    idVisitor: yup.number().required('El visitante es requerido'),
    idApartment: yup.number().required('El apartamento es requerido'),
    startingDate: yup.date().required('La fecha de inicio es requerida'),
    personAllowsAccess: yup.string().required('La persona que permite el acceso es requerida'),
});

//Se crea el esquema de validación para el método PUT
const putGuestIncomeSchema = yup.object().shape({
    idGuest_income: yup.number().required('El ingreso de visitante es requerido'),
    departureDate: yup.date().required('La fecha de salida es requerida'),
});

//Se crea el middleware de validación, el cual se encarga de validar el esquema de acuerdo al método de la solicitud

function guestIncomeValidations (req, res, next) {
    try {
      let schema;
      // Determina el esquema a utilizar segun el mertodo de la solicitud
      if (req.method === 'POST') {
        schema = postGuestIncomeSchema;
      } else if (req.method === 'PUT') {
        schema = putGuestIncomeSchema;
      } else {
        // Si no es POST ni PUT, llama a next() sin validar
        return next();
      }
      // Realiza la validación del esquema
      schema.validateSync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      // Captura los errores de validación y envíalos en la respuesta JSON
      const errors = error.inner.map(err => ({
        field: err.path,
        message: err.message
      }));
      res.status(400).json({ errors });
    }
  
}


//Se exporta el middleware de validación

module.exports = {
    guestIncomeValidations,
}

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