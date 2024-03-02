const yup = require("yup");

const postUserSchema = yup.object().shape({

    docType: yup.string().required("El tipo de documento es requerido")
        .length(2).matches(/^(CC|CE|TI|PA)$/, 'Tipo de documento invalido'),

    document: yup.string().required("El documento es requerido").min(7).max(13),

    name: yup.string().required("El nombre es requerido"),

    lastName: yup.string().required("El apellido es requerido"),

    idrole: yup.number().required("El rol es requerido"),

    password: yup.string().required("La contraseña es requerida")
        .min(8, 'Debe tener minimo 8 caracteres')
        .max(12, 'Solo puede tener maximo 12 caracteres'),

    email: yup.string().email().required("El correo es requerido"),

    phone: yup.string().min(10).max(10).required(),

});


const putUserSchema = yup.object().shape({

    docType: yup.string().length(2).matches(/^(CC|CE|TI|PA)$/, 'Tipo de documento invalido'),

    document: yup.string().min(7).max(13),

    name: yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'No se permiten caracteres especiales'),

    lastName: yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'No se permiten caracteres especiales'),

    idrole: yup.number(),

    email: yup.string().email(),

    phone: yup.string().matches(/^[0-9]*$/, 'Solo se permiten números').min(10).max(10),

    state: yup.string().matches(/^(Activo|Inactivo)$/, 'Estado invalido'),

});


const UserValidationes = (req, res, next) => {
    try {
        let schema;
        if (req.method === 'POST') {
            schema = postUserSchema;
        } else if (req.method === 'PUT') {
            schema = putUserSchema;
        } else {
            return next();
        }
        schema.validateSync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errors = error.inner.map(err => ({
            field: err.path,
            message: err.message
        }));
        res.status(400).json({ errors });
    }
}


module.exports = {
    UserValidationes,
}



// const validateUser = [
//   check('docType')
//     .isIn(['CC', 'CE'])
//     .withMessage('El campo "documentType" debe ser "CC" o "CE'),

//   check('document')
//     .isString()
//     .isLength({ min: 8, max: 10 })
//     .withMessage('El campo "document" debe ser una cadena de 8 a 10 caracteres'),


//   check('name')
//     .isString()
//     .withMessage('El campo "name" debe ser una cadena'),

//   check('lastName')
//     .isString()
//     .withMessage('El campo "lastname" debe ser una cadena'),

//   check('idrole')
//     .custom(async (value, { req }) => {
//       if (typeof value === 'undefined' || value === null) {
//         value = 2;
//         req.body.idrole = 2;
//         req.body.state = 'Inactivo';
//       }
//       const existingRol = await Rols.findOne({ where: { idrole: value } });
//       if (!existingRol) {
//         throw new Error('No existe el rol');
//       }
//       return true;
//     }),

//   check('password')
//     .isLength({ min: 8, max: 12 })
//     .withMessage('El campo "password" debe tener al menos 8 a 12 caracteres'),


//   check('email')
//     .isEmail()
//     .withMessage('El campo "email" debe ser un correo electrónico válido'),

//   check('phone')
//     .isString()
//     .isLength({ min: 10, max: 10 })
//     .optional()
//     .withMessage('El campo "phone" debe ser una cadena de 10 caracteres'),


//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
// ];

