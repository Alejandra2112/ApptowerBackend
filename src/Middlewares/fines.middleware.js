const { check } = require('express-validator');



const postFinesValidations = [
  check('iduser').isInt().withMessage('el id del usuario es requerido')
  .notEmpty().withMessage('El id del usuario es requerido')
  .isLength({min: 1}).withMessage('El id del usuario es requerido'),

  check('fineType').isString().withMessage('Tipo de multa es requerido')
  .notEmpty().withMessage('Tipo de multa es requerido')
  .isLength({min: 3}).withMessage('Tipo de multa es requerido'),
  check('incidentDate')
  .custom((value) => {
    if (isNaN(Date.parse(value))) {
      throw new Error(`La fecha de pago debe ser valida, recibido: ${value}`);
    }
    const paymentDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (paymentDate > currentDate) {
      throw new Error(`La fecha de pago no puede ser anterior al día actual`);
    }
    return true;
  })
  .notEmpty().withMessage('Se requiere la fecha del incidente')
  .isLength({min: 1}).withMessage('Se requiere la fecha del incidente'),

  check('paymentDate').custom((value) => {
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
  })
  .notEmpty().withMessage('Se requiere la fecha de pago')
  .isLength({min: 1}).withMessage('Se requiere la fecha de pago'),
  check('evidenceFiles').custom((value, { req }) => {
    if (!req.files || !req.files.hasOwnProperty('evidenceFiles') || req.files.evidenceFiles.length === 0) {
      throw new Error(`Se requiere al menos un archivo de evidencia`);
    }
    return true;
  }),

  check('amount').isNumeric().withMessage('Se requiere el monto de la multa')
  .isDecimal().withMessage('El monto debe ser un número decimal')
  .notEmpty().withMessage('Se requiere el monto de la multa')
  .isLength({min: 5}).withMessage('El valor nimino es de 5 digitos'),
  check('idApartment').isInt().withMessage('Se requiere el id del apartamento')
  .notEmpty().withMessage('Se requiere el id del apartamento'),
  check('state').isString().withMessage('Se requiere el estado de la multa')
  .notEmpty().withMessage('Se requiere el estado de la multa')
  .matches(/^(Pendiente|Pagada|Por revisar)$/).withMessage('Estado invalido, debe ser Pendiente, Pagada o Por pagar'),
  check('details').isString().withMessage('Se requiere una descripcion de incidente')
  .notEmpty().withMessage('Se requiere una descripcion de incidente')
  .isLength({min: 3, max: 500}).withMessage('Debe tener entre 3 y 500 caracteres'),
];

const putFinesValidations = [
  check('idfines').isInt().withMessage('Se requiere el id de la multa')
  .notEmpty().withMessage('Se requiere el id de la multa'),
  check('state').isString().withMessage('Valor invalido para el estado')
  .notEmpty().withMessage('Se requiere el estado de la multa')
  .matches(/^(Pendiente|Pagada|Por revisar)$/).withMessage('Estado invalido, debe ser Pendiente, Pagada o Por revisar'),
  check('paymentproof').optional().custom((value, {req}) => {
    if (!req.files && req.files.length > 1) {
      throw new Error(`Se requiere un comprobante de pago`);
    }
    return true;
  }),
];

module.exports = {
  postFinesValidations,
  putFinesValidations,
};


//Se crea el middleware de validación, el cual se encarga de validar el esquema de acuerdo al método de la solicitud

// function finesValidations (req, res, next) {
//     try {
//       let schema;
//       // Determina el esquema a utilizar segun el mertodo de la solicitud
//       if (req.method === 'POST') {
//         schema = postFinesSchema;
//       } else if (req.method === 'PUT') {
//         schema = putFinesSchema;
//       } else {
//         // Si no es POST ni PUT, llama a next() sin validar
//         return next();
//       }
//       // Realiza la validación del esquema
//       schema.validateSync(req.check, { abortEarly: false });
//       next();
//     } catch (error) {
//       // Captura los errores de validación y envíalos en la respuesta JSON
//       const errors = error.inner.map(err => ({
//         field: err.path,
//         message: err.message
//       }));
//       res.status(400).json({ errors });
//     }
// }

// //Se exporta el middleware de validación

// module.exports = {
//     finesValidations,

// }

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