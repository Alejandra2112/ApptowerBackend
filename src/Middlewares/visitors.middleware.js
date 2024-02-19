const yup = require("yup");
    //Se crea el esquema de validación para el método PUT
    const postVisitorSchema = yup.object().shape({
        //se pone el campo tal cual como viene en el json, yup.tipo de dato y luego
        //la validacion que re quiera hacer, dentro de los parentesis el mensaje que se quieraenviar en caso de error
        // las valiaciones que yup permite son:
        // required, string, number, boolean, date, array, object, mixed, email, url, min, max, matches, length, etc
        name: yup.string().required("El nombre es requerido").min(3, 'Debe tener un minimo de 3 caracteres')
        .max(50, 'Solo puede tener maximo 50 caracteres'),

        lastname: yup.string().required("El apellido es requerido")
        .min(3, 'Debe tener minimo 3 caracteres')
        .max(50,'Solo puede tener maximo 50 caracteres'),

        documentType: yup.string().required("El tipo de documento es requerido")
        .length(2).matches(/^(CC|CE|TI|PA)$/, 'Tipo de documento invalido'),
        documentNumber: yup.string().min(7).max(10).required(),
        
        genre: yup.string().required().matches(/^(M|F|O)$/),
        access: yup.bool().required(),
    });
    
    const putVisitosSchema = yup.object().shape({
        access: yup.bool().required('El acceso es requerido'),
    });
  
    
    //Se crea el middleware de validación, el cual se encarga de validar el esquema de acuerdo al método de la solicitud
    function visitorsValidations (req, res, next) {
        try {
          let schema;
          // Determina el esquema a utilizar segun el mertodo de la solicitud
          if (req.method === 'POST') {
            schema = postVisitorSchema;
          } else if (req.method === 'PUT') {
            schema = putVisitosSchema;
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
    visitorsValidations,
}

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

