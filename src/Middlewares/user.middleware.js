const UserModel = require('../Models/users.model');
const { check } = require('express-validator');

const sexs = [
    {
        value: "M",
        label: "Masculino"
    },
    {
        value: "F",
        label: "Femenino"
    },
    {
        value: "O",
        label: "Otro"
    }
];

const docTypes = [
    {
        value: "CC",
        label: "Cédula de ciudadanía"
    },
    {
        value: "TI",
        label: "Tarjeta de identidad"
    },
    {
        value: "CE",
        label: "Cédula de extranjería"
    },
    {
        value: "PAST",
        label: "Pasaporte"
    },
    {
        value: "RC",
        label: "Registro civil"
    },
    {
        value: "NIT",
        label: "Número de identificación tributaria"
    },
    {
        value: "PEP",
        label: "Permiso especial de permanencia"
    }
];

const userPersonalInfoValidationForPut = [

    check('docType')
        .optional({ nullable: true })
        .isString().withMessage('El tipo de documento debe ser una cadena de caracteres.')
        .isIn(docTypes.map(doc => doc.value)).withMessage('El tipo de documento no es válido.'),

    check('document')
        .optional({ nullable: true })
        .isAlphanumeric().withMessage('El número de documento solo puede contener números y letras.')
        .custom(async (value, { req }) => {

            const body = req.body

            const userById = await UserModel.findOne({ where: { iduser: body.iduser } });
            const userByDocument = await UserModel.findOne({ where: { document: value } });

            if (!userById || !userByDocument) {
                return true;
            } else if (userById.document !== userByDocument.document) {
                throw new Error(`El documento "${value}" ya está en uso.`);
            } else {
                return true;
            }



        }),


    check('name')
        .optional({ nullable: true })
        .isString().withMessage('El nombre debe ser una cadena de caracteres.')
        .matches(/^[a-zA-Z\s]+$/).withMessage('El nombre solo puede contener letras y espacios.'),

    check('lastName')
        .optional({ nullable: true })
        .isString().withMessage('El apellido debe ser una cadena de caracteres.')
        .matches(/^[a-zA-Z\s]+$/).withMessage('El apellido solo puede contener letras y espacios.'),

    check('birthday')
        .optional({ nullable: true })
        .custom((value) => {
            if (value) {
                const birthdayDate = new Date(value);
                const today = new Date();

                if (birthdayDate > today) {
                    throw new Error('La fecha de nacimiento no puede ser mayor a hoy.');
                }
            }
            return true;
        }),

    check('sex')
        .optional({ nullable: true })
        .isString().withMessage('El género debe ser una cadena de caracteres.')
        .isIn(sexs.map(sex => sex.value)).withMessage('El género no es válido.'),

    check('email')
        .optional({ nullable: true })
        .isEmail().withMessage('El correo electrónico debe tener un formato válido.')
        .custom(async (value, { req }) => {

            const body = req.body

            const userById = await UserModel.findOne({ where: { iduser: body.iduser } });
            const userByEmail = await UserModel.findOne({ where: { email: value } });

            if (!userById || !userByEmail) {
                return true;
            } else if (userById.email !== userByEmail.email) {
                throw new Error(`El email "${value}" ya está en uso.`);
            } else {
                return true;
            }



        }),

    check('phone')
        .optional({ nullable: true })
        .isString().withMessage('El teléfono debe ser una cadena de caracteres.')
        .isLength({ min: 10, max: 13 }).withMessage('El teléfono debe tener entre 10 y 13 caracteres.')
        .isNumeric().withMessage('El teléfono solo puede contener números.'),

];

module.exports = {
    userPersonalInfoValidationForPut,
};















// const yup = require("yup");

// const postUserSchema = yup.object().shape({

//     docType: yup.string().required("El tipo de documento es requerido")
//         .length(2).matches(/^(CC|CE|TI|PA)$/, 'Tipo de documento invalido'),

//     document: yup.string().required("El documento es requerido").min(7).max(13),

//     name: yup.string().required("El nombre es requerido"),

//     lastName: yup.string().required("El apellido es requerido"),

//     idrole: yup.number().required("El rol es requerido"),

//     password: yup.string().required("La contraseña es requerida")
//         .min(8, 'Debe tener minimo 8 caracteres')
//         .max(12, 'Solo puede tener maximo 12 caracteres'),

//     email: yup.string().email().required("El correo es requerido"),

//     phone: yup.string().min(10).max(10).required(),

// });


// const putUserSchema = yup.object().shape({

//     docType: yup.string().length(2).matches(/^(CC|CE|TI|PA)$/, 'Tipo de documento invalido'),

//     document: yup.string().min(7).max(13),

//     name: yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'No se permiten caracteres especiales'),

//     lastName: yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'No se permiten caracteres especiales'),

//     idrole: yup.number(),

//     email: yup.string().email(),

//     phone: yup.string().matches(/^[0-9]*$/, 'Solo se permiten números').min(10).max(10),

//     state: yup.string().matches(/^(Activo|Inactivo)$/, 'Estado invalido'),

// });


// const UserValidationes = (req, res, next) => {
//     try {
//         let schema;
//         if (req.method === 'POST') {
//             schema = postUserSchema;
//         } else if (req.method === 'PUT') {
//             schema = putUserSchema;
//         } else {
//             return next();
//         }
//         schema.validateSync(req.body, { abortEarly: false });
//         next();
//     } catch (error) {
//         const errors = error.inner.map(err => ({
//             field: err.path,
//             message: err.message
//         }));
//         res.status(400).json({ errors });
//     }
// }





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

