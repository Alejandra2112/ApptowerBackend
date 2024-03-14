const { check, validationResult } = require('express-validator');
const Visitors = require('../Models/visitors.model');

const postVisitorsValidations = [
  // ...resto de las validaciones
  check('name').isString().withMessage('El nombre es requerido')
  .notEmpty().withMessage('El nombre es requerido')
  .isLength({ min: 3, max: 50 }).withMessage('Debe tener un minimo de 3 caracteres y maximo 50 caracteres'),
  
  check('lastname').isString().withMessage('El apellido es requerido')
  .notEmpty().withMessage('El apellido es requerido')
  .isLength({ min: 3, max: 50 }).withMessage('Debe tener minimo 3 caracteres y maximo 50 caracteres'),

  check('documentType').isString().withMessage('El tipo de documento es requerido')
  .notEmpty().withMessage('El tipo de documento es requerido')
  .isLength({ min: 2, max: 2 }).withMessage('Tipo de documento invalido')
  .matches(/^(CC|CE|TI|PA)$/).withMessage('Tipo de documento invalido'),

  check('documentNumber').isString().withMessage('El número de documento es requerido')
  .notEmpty().withMessage('El número de documento es requerido')
  .isLength({ min: 7, max: 10 })
  .custom(async (value) => {

    const visitor = await Visitors.findOne({where: { documentNumber: value }});
    if (visitor) {
      throw new Error('El número de documento ya existe');
    }
    console.log("este es el visitante", visitor);
  }),
  check('genre').isString().withMessage('El genero es requerido')
  .notEmpty().withMessage('El genero es requerido')
  .matches(/^(M|F|O)$/).withMessage('Genero invalido'),

  check('access').isBoolean().withMessage('El acceso es requerido'),

  (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg, path }) => {
      return { field: path, message: msg };
    });
  
    if (!errors.isEmpty()) {
      const firstErrors = errors.array().reduce((accumulator, currentError) => {
        if (!accumulator.find(error => error.field === currentError.field)) {
          accumulator.push(currentError);
        }
        return accumulator;
      }, []);
  
      return res.status(400).json({ errors: firstErrors });
    }
    next();
  },
];

const putVisitorsValidations = [
  check('access').isBoolean().withMessage('El acceso es requerido'),
  (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg, path }) => {
      return { field: path, message: msg };
    });
  
    if (!errors.isEmpty()) {
      const firstErrors = errors.array().reduce((accumulator, currentError) => {
        if (!accumulator.find(error => error.field === currentError.field)) {
          accumulator.push(currentError);
        }
        return accumulator;
      }, []);
  
      return res.status(400).json({ errors: firstErrors });
    }
    next();
  },

];

module.exports = {
  postVisitorsValidations,
  putVisitorsValidations,
};

// const {check, validationResult} = require('express-validator');


// const validateResult = (req, res, next) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array()});
//     }
//     next();
// };

// const postValidationVisitor = [
//     check('name', 'Name is required or its value is invalid').not().isEmpty().isString().isLength({min: 3, max: 50}),
//     check('lastname', 'Lastname is required or its value is invalid').not().isEmpty().isString().isLength({min: 3, max: 50}),
//     check('documentType', 'Document type is required or its value is invalid').not().isEmpty().matches(/CC|CE|TI|PA/).isLength({min: 2, max: 2}),
//     check('documentNumber', 'Document number is required or its value is invalid').not().isEmpty().isLength({min: 7, max: 10}),
//     check('genre', 'Genre is required or its value is invalid').not().isEmpty().matches(/M|F|O/),
//     check('access', 'Access is required').not().isEmpty().isBoolean(),
//     (req, res, next)=>{
//         validateResult(req, res, next);
//     }
// ];

// const putValidationVisitor = [
//     check('access', 'Access is required').not().isEmpty().isBoolean(),
//     (req, res, next)=>{
//         validateResult(req, res, next);
//     }
// ];

// module.exports = {
//     postValidationVisitor,
//     putValidationVisitor,
// };

