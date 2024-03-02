const { check } = require('express-validator');

const postFinesValidations = [
  check('idUser').isInt().withMessage('el id del usuario es requerido'),
  check('fineType').isString().withMessage('Tipo de multa es requerido'),
  check('incidentDate').isDate().withMessage('Se requiere la fecha del incidente'),
  check('paymentDate').isDate().withMessage('Se requiere la fecha de pago'),
  check('amount').isNumeric().withMessage('Se requiere el monto de la multa'),
  check('idApartment').isInt().withMessage('Se requiere el id del apartamento'),
  check('state').isString().withMessage('Se requiere el estado de la multa'),
  check('details').isString().withMessage('Se requiere una descripcion de incidente')
];

const putFinesValidations = [
  check('idfines').isInt().withMessage('Se requiere el id de la multa'),
  check('state').isString().withMessage('Se requiere el estado de la multa'),
];

module.exports = {
  postFinesValidations,
  putFinesValidations
};


//Se crea el middleware de validación, el cual se encarga de validar el esquema de acuerdo al método de la solicitud

function finesValidations (req, res, next) {
    try {
      let schema;
      // Determina el esquema a utilizar segun el mertodo de la solicitud
      if (req.method === 'POST') {
        schema = postFinesSchema;
      } else if (req.method === 'PUT') {
        schema = putFinesSchema;
      } else {
        // Si no es POST ni PUT, llama a next() sin validar
        return next();
      }
      // Realiza la validación del esquema
      schema.validateSync(req.check, { abortEarly: false });
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
    finesValidations,

}

// const {check , validationResult} = require('express-validator');
// const validateResult = (req, res, next) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array()});
//     }
//     next();
// };

// const postFinesValidation = [
//     check('idUser', 'User is required or its value is invalid').not().isEmpty().isInt(),
//     check('fineType', 'Fine type is required or its value is invalid').not().isEmpty().isString().isLength({min: 3, max: 50}),
//     check('incidentDate', 'Incident date is required or its value is invalid').not().isEmpty().isISO8601(),
//     check('paymentDate', 'Payment date is required or its value is invalid').not().isEmpty().isISO8601(),
//     check('amount', 'Amount is required or its value is invalid').not().isEmpty().isInt(),
//     check('idApartment', 'Aparment is required or its value is invalid').not().isEmpty().isInt(),
//     check('state', 'State is required or its value is invalid').not().isEmpty().isString().isLength({min: 3, max: 50}),
//     (req, res, next)=>{
//         validateResult(req, res, next);
//     }
// ];

// const putFinesValidation = [
//     check('idfines', 'Fines is required or its value is invalid').not().isEmpty().isInt(),
//     check('state', 'State is required or its value is invalid').not().isEmpty().isString().isLength({min: 3, max: 50}),
//     ( req, res, next ) => {
//         validateResult(req, res, next);
//     }
// ];

// module.exports = {
//     postFinesValidation,
//     putFinesValidation,
// };