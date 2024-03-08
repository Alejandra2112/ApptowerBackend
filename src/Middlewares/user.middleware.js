const { check, validationResult } = require('express-validator');
const UserModel = require('../Models/users.model');
const RoleModel = require('../Models/rols.model.js');



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
    },
    {
        value: "No proporcionado",
        label: "No proporcionado"
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




const userValidationForPost = [

    check('docType')
        .optional({ nullable: true })
        .isString().withMessage('El tipo de documento debe ser una cadena de caracteres.')
        .isIn(docTypes.map(doc => doc.value)).withMessage('El tipo de documento no es válido.'),


    check('document')
        .optional({ nullable: true })
        .isAlphanumeric().withMessage('El documento solo puede contener números.')
        .custom(async (value, { req }) => {

            const userByDocument = await UserModel.findOne({ where: { document: value } });

            if (userByDocument) {
                throw new Error(`El documento "${value}" ya está en uso.`);
            }

            return true;


        }),

    check('name')
        .notEmpty().withMessage('El nombre es requerido.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/, 'i').withMessage('El nombre no puede contener caracteres especiales.'),


    check('lastName')
        .notEmpty().withMessage('El apellido es requerido.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/, 'i').withMessage('El apellido no puede contener caracteres especiales.'),


    check('idrole')
        .isNumeric().withMessage('El rol es requerido.'),


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
        .isLength({ min: 10, max: 13 }).withMessage('El teléfono debe tener 10 números.')
        .matches(/^[0-9]*$/, 'i').withMessage('Solo se permiten números.'),


    check('birthday')
        .notEmpty().withMessage('La fecha de nacimiento es requerida.'),


    check('sex')
        .matches(/^(M|F|O|No proporcionado)$/, 'i').withMessage('Sexo inválido.'),
];




const userValidationForPut = [
    check('docType')
        .optional({ nullable: true })
        .isString().withMessage('El tipo de documento debe ser una cadena de caracteres.')
        .isIn(docTypes.map(doc => doc.value)).withMessage('El tipo de documento no es válido.'),


    check('document')
        .isLength({ min: 8, max: 13 }).withMessage('El documento debe tener entre 8 y 13 números.')
        .isAlphanumeric().withMessage('El número de documento solo puede contener números.')
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
        .notEmpty().withMessage('El nombre es requerido.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/, 'i').withMessage('El nombre no puede contener caracteres especiales.'),


    check('lastName')
        .notEmpty().withMessage('El apellido es requerido.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/, 'i').withMessage('El apellido no puede contener caracteres especiales.'),


    check('idrole')
        .isNumeric().withMessage('El rol es requerido.'),


    check('birthday')
        .notEmpty().withMessage('La fecha de nacimiento es requerida.'),


    check('password')
        .isLength({ min: 8, max: 12 }).withMessage('La contraseña debe tener entre 8 y 12 caracteres.'),


    check('email')
        .isEmail().withMessage('El correo es inválido.'),


    check('phone')
        .isLength({ min: 10, max: 10 }).withMessage('El teléfono debe tener 10 números.')
        .matches(/^[0-9]*$/, 'i').withMessage('Solo se permiten números.'),



    check('sex')
        .isString().withMessage('El género debe ser una cadena de caracteres.')
        .isIn(sexs.map(sex => sex.value)).withMessage('El género no es válido.'),

];


const watchmanValidationForPost = [
    check('idEnterpriseSecurity').isNumeric().withMessage('La empresa de seguridad es requerida.'),

    check('iduser').isNumeric().withMessage('El id del usuario es requerido.'),

];

const watchmanValidationForPut = [
    check('idEnterpriseSecurity').isNumeric().withMessage('La empresa de seguridad es requerida.'),

    check('iduser').isNumeric().withMessage('El id del usuario es requerido.'),

    check('state').isIn(['Activo', 'Inactivo']).withMessage('Estado inválido.'),

];


const residentValidationForPost = [
    check('iduser')
        .isNumeric()
        .withMessage('El id del usuario es requerido.'),

    check('residentType')
        .isIn(['tenant', 'owner'])
        .withMessage('El tipo de residente es inválido. Debe ser "residente" o "propietario".'),



    check('status')
        .optional()
        .isIn(['Active', 'Inactive'])
        .withMessage('El estado es inválido. Debe ser "Active" o "Inactive".'),
];

const residentValidationForPut = [
    check('iduser')
        .isNumeric()
        .withMessage('El id del usuario es requerido.'),

    check('residentType')
        .isIn(['tenant', 'owner'])
        .withMessage('El tipo de residente es inválido. Debe ser "tenant" o "owner".'),

    check('status')
        .isIn(['Active', 'Inactive'])
        .withMessage('El estado es inválido. Debe ser "Active" o "Inactive".'),
];


const userValidations = async (req, res, next) => {
    const { idrole } = req.body;
    if (!idrole) {
        return res.status(400).json({ error: 'El idrole es requerido.' });
    }

    const role = await RoleModel.findOne({ where: { idrole } });
    if (!role) {
        return res.status(400).json({ error: 'El idrole proporcionado no existe.' });
    }

    const roleName = role.dataValues.namerole.toLowerCase();
    req.roleName = roleName;

    let checks;
    if (req.method === 'POST') {
        checks = roleName.includes('residente') ? [...residentValidationForPost, ...userValidationForPost] :
            roleName.includes('vigilante') ? [...watchmanValidationForPost, ...userValidationForPost] :
                userValidationForPost;
    } else if (req.method === 'PUT') {
        checks = roleName.includes('residente') ? [...residentValidationForPut, ...userValidationForPut] :
            roleName.includes('vigilante') ? [...watchmanValidationForPut, ...userValidationForPut] :
                userValidationForPut;
    } else {
        return next();
    }

    Promise.all(checks.map(check => check.run(req)))
        .then(() => next())
        .catch(next);
};

// PostPersonalInfo

const userPersonalInfoValidationForPost = [

    check('docType')
        .notEmpty().withMessage('El tipo de documento es obligatorio.')
        .isString().withMessage('El tipo de documento debe ser una cadena de caracteres.')
        .isIn(docTypes.map(doc => doc.value)).withMessage('El tipo de documento no es válido.'),

    check('document')
        .notEmpty().withMessage('El número de documento es obligatorio.')
        .isAlphanumeric().withMessage('El número de documento solo puede contener números.')
        .custom(async (value, { req }) => {

            const userByDocument = await UserModel.findOne({ where: { document: value } });

            if (userByDocument) {

                throw new Error(`El documento "${value}" ya está en uso.`);

            }

            return true;
        }),

    check('name')
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isString().withMessage('El nombre debe ser una cadena de caracteres.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]+$/).withMessage('El nombre solo puede contener letras y espacios.'),

    check('lastName')
        .notEmpty().withMessage('El apellido es obligatorio.')
        .isString().withMessage('El apellido debe ser una cadena de caracteres.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]+$/).withMessage('El apellido solo puede contener letras y espacios.'),

    check('birthday')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria.')
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
        .notEmpty().withMessage('El género es obligatorio.')
        .isString().withMessage('El género debe ser una cadena de caracteres.')
        .isIn(sexs.map(sex => sex.value)).withMessage('El género no es válido.'),

    check('email')
        .notEmpty().withMessage('El correo electrónico es obligatorio.')
        .isEmail().withMessage('El correo electrónico debe tener un formato válido.')
        .custom(async (value, { req }) => {

            const userByEmail = await UserModel.findOne({ where: { email: value } });

            if (userByEmail) {

                throw new Error(`El email "${value}" ya está en uso.`);

            }
            return true;
        }),

    check('phone')
        .notEmpty().withMessage('El teléfono es obligatorio.')
        .isString().withMessage('El teléfono debe ser una cadena de caracteres.')
        .isLength({ min: 10, max: 13 }).withMessage('El teléfono debe tener entre 10 y 13 caracteres.')
        .isNumeric().withMessage('El teléfono solo puede contener números.')
];

// Age validation 18

const ageValidation = [
    check('birthday')
        .custom((value) => {
            const birthdayDate = new Date(value);
            const today = new Date();
            const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

            if (birthdayDate > today) {
                throw new Error('La fecha de nacimiento no puede ser mayor a hoy.');
            } else if (birthdayDate > minAgeDate) {
                throw new Error('Debe tener al menos 18 años de edad.');
            }

            return true;
        })
];



// Put personal information

const userPersonalInfoValidationForPut = [

    check('docType')
        .optional({ nullable: true })
        .isString().withMessage('El tipo de documento debe ser una cadena de caracteres.')
        .isIn(docTypes.map(doc => doc.value)).withMessage('El tipo de documento no es válido.'),

    check('document')
        .optional({ nullable: true })
        .isAlphanumeric().withMessage('El número de documento solo puede contener números.')
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
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]+$/).withMessage('El nombre solo puede contener letras y espacios.'),

    check('lastName')
        .optional({ nullable: true })
        .isString().withMessage('El apellido debe ser una cadena de caracteres.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]+$/).withMessage('El apellido solo puede contener letras y espacios.'),

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

// Post Password

const passwordValidationForPost = [

    check('password')
        .isLength({ min: 6, max: 12 }).withMessage('La contraseña debe tener entre 8 y 12 caracteres.')
    , // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/)
    // .withMessage('La contraseña debe contener mayúsculas, minúsculas, números y símbolos.'),

    check('passwordConfirm')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden.');
            } else {
                return true;
            }
        })
];




module.exports = {

    userPersonalInfoValidationForPut,
    passwordValidationForPost,
    userPersonalInfoValidationForPost,
    ageValidation,
    userValidations,

};







































// const { check, validationResult } = require('express-validator');
// const UserModel = require('../Models/users.model');
// const RoleModel = require('../Models/rols.model.js');


// const sexs = [
//     {
//         value: "M",
//         label: "Masculino"
//     },
//     {
//         value: "F",
//         label: "Femenino"
//     },
//     {
//         value: "O",
//         label: "Otro"
//     },
//     {
//         value: "No proporcionado",
//         label: "No proporcionado"
//     }
// ];

// const docTypes = [
//     {
//         value: "CC",
//         label: "Cédula de ciudadanía"
//     },
//     {
//         value: "TI",
//         label: "Tarjeta de identidad"
//     },
//     {
//         value: "CE",
//         label: "Cédula de extranjería"
//     },
//     {
//         value: "PAST",
//         label: "Pasaporte"
//     },
//     {
//         value: "RC",
//         label: "Registro civil"
//     },
//     {
//         value: "NIT",
//         label: "Número de identificación tributaria"
//     },
//     {
//         value: "PEP",
//         label: "Permiso especial de permanencia"
//     }
// ];

// const userValidationForPost = [

//     check('docType')
//         .isString().withMessage('El tipo de documento debe ser una cadena de caracteres.')
//         .isIn(docTypes.map(doc => doc.value)).withMessage('El tipo de documento no es válido.'),


//     check('document')
//         .isAlphanumeric().withMessage('El número de documento solo puede contener números.')
//         .custom(async (value, { req }) => {

//             const userByDocument = await UserModel.findOne({ where: { document: value } });

//             if (userByDocument) {

//                 throw new Error(`El documento "${value}" ya está en uso.`);

//             }

//             return true;

//         }),

//     check('name')
//         .notEmpty().withMessage('El nombre es requerido.')
//         .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/, 'i').withMessage('El nombre no puede contener caracteres especiales.'),


//     check('lastName')
//         .notEmpty().withMessage('El apellido es requerido.')
//         .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/, 'i').withMessage('El apellido no puede contener caracteres especiales.'),

//     check('birthday')
//         .custom((value) => {
//             if (value) {
//                 const birthdayDate = new Date(value);
//                 const today = new Date();

//                 if (birthdayDate > today) {
//                     throw new Error('La fecha de nacimiento no puede ser mayor a hoy.');
//                 }
//             }
//             return true;
//         }),

//     check('idrole')
//         .isNumeric().withMessage('El rol es requerido.'),


//     check('email')
//         .optional({ nullable: true })
//         .isEmail().withMessage('El correo electrónico debe tener un formato válido.')
//         .custom(async (value, { req }) => {

//             const userByEmail = await UserModel.findOne({ where: { email: value } });

//             if (userByEmail) {

//                 throw new Error(`El email "${value}" ya está en uso.`);

//             }
//             return true;


//         }),


//     check('phone')
//         .optional({ nullable: true })
//         .isString().withMessage('El teléfono debe ser una cadena de caracteres.')
//         .isLength({ min: 10, max: 13 }).withMessage('El teléfono debe tener entre 10 y 13 caracteres.')
//         .isNumeric().withMessage('El teléfono solo puede contener números.'),


//     check('sex')
//         .optional({ nullable: true })
//         .isString().withMessage('El género debe ser una cadena de caracteres.')
//         .isIn(sexs.map(sex => sex.value)).withMessage('El género no es válido.'),
// ];




// const userValidationForPut = [


//     check('docType')
//         .optional({ nullable: true })
//         .isString().withMessage('El tipo de documento debe ser una cadena de caracteres.')
//         .isIn(docTypes.map(doc => doc.value)).withMessage('El tipo de documento no es válido.'),


//     check('document')
//         .optional({ nullable: true })
//         .isAlphanumeric().withMessage('El número de documento solo puede contener números.')
//         .custom(async (value, { req }) => {

//             const body = req.body

//             const userById = await UserModel.findOne({ where: { iduser: body.iduser } });
//             const userByDocument = await UserModel.findOne({ where: { document: value } });

//             if (!userById || !userByDocument) {
//                 return true;
//             } else if (userById.document !== userByDocument.document) {
//                 throw new Error(`El documento "${value}" ya está en uso.`);
//             } else {
//                 return true;
//             }

//         }),


//     check('name')
//         .notEmpty().withMessage('El nombre es requerido.')
//         .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/, 'i').withMessage('El nombre no puede contener caracteres especiales.'),


//     check('lastName')
//         .notEmpty().withMessage('El apellido es requerido.')
//         .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/, 'i').withMessage('El apellido no puede contener caracteres especiales.'),


//     check('idrole')
//         .isNumeric().withMessage('El rol es requerido.'),


//     check('email')
//         .optional({ nullable: true })
//         .isEmail().withMessage('El correo electrónico debe tener un formato válido.')
//         .custom(async (value, { req }) => {

//             const body = req.body

//             const userById = await UserModel.findOne({ where: { iduser: body.iduser } });
//             const userByEmail = await UserModel.findOne({ where: { email: value } });

//             if (!userById || !userByEmail) {
//                 return true;
//             } else if (userById.email !== userByEmail.email) {
//                 throw new Error(`El email "${value}" ya está en uso.`);
//             } else {
//                 return true;
//             }

//         }),



//     check('phone')
//         .optional({ nullable: true })
//         .isString().withMessage('El teléfono debe ser una cadena de caracteres.')
//         .isLength({ min: 10, max: 13 }).withMessage('El teléfono debe tener entre 10 y 13 caracteres.')
//         .isNumeric().withMessage('El teléfono solo puede contener números.'),


//     check('birthday')
//         .optional({ nullable: true })
//         .custom((value) => {
//             if (value) {
//                 const birthdayDate = new Date(value);
//                 const today = new Date();

//                 if (birthdayDate > today) {
//                     throw new Error('La fecha de nacimiento no puede ser mayor a hoy.');
//                 }
//             }
//             return true;
//         }),


//     check('sex')
//         .optional({ nullable: true })
//         .isString().withMessage('El género debe ser una cadena de caracteres.')
//         .isIn(sexs.map(sex => sex.value)).withMessage('El género no es válido.'),


//     check('state')
//         .matches(/^(Activo|Inactivo)$/, 'i').withMessage('Estado inválido.'),
// ];


// const watchmanValidationForPost = [

//     check('idEnterpriseSecurity').isNumeric().withMessage('El rol es requerido.'),

//     check('iduser').isNumeric().withMessage('El rol es requerido.'),

// ];

// const watchmanValidationForPut = [
//     check('idEnterpriseSecurity').isNumeric().withMessage('La empresa de seguridad es requerida.'),

//     check('iduser').isNumeric().withMessage('El id del usuario es requerido.'),

//     check('state').isIn(['Activo', 'Inactivo']).withMessage('Estado inválido.'),

// ];


// const residentValidationForPost = [
//     check('iduser')
//         .isNumeric()
//         .withMessage('El id del usuario es requerido.'),

//     check('residentType')
//         .isIn(['tenant', 'owner'])
//         .withMessage('El tipo de residente es inválido. Debe ser "arrendatario" o "propietario".'),

//     check('status')
//         .optional()
//         .isIn(['Active', 'Inactive'])
//         .withMessage('El estado es inválido. Debe ser "Activo" o "Inactivo".'),
// ];

// const residentValidationForPut = [
//     check('iduser')
//         .isNumeric()
//         .withMessage('El id del usuario es requerido.'),

//     check('residentType')
//         .isIn(['tenant', 'owner'])
//         .withMessage('El tipo de residente es inválido. Debe ser "tenant" o "owner".'),

//     check('status')
//         .isIn(['Active', 'Inactive'])
//         .withMessage('El estado es inválido. Debe ser "Active" o "Inactive".'),
// ];



// const userValidations = async (req, res, next) => {
//     const { idrole } = req.body;
//     if (!idrole) {
//         return res.status(400).json({ error: 'El idrole es requerido.' });
//     }

//     const role = await RoleModel.findOne({ where: { idrole } });
//     if (!role) {
//         return res.status(400).json({ error: 'El idrole proporcionado no existe.' });
//     }

//     const roleName = role.dataValues.namerole.toLowerCase();
//     req.roleName = roleName;

//     let checks;
//     if (req.method === 'POST') {
//         checks = roleName.includes('residente') ? [...residentValidationForPost, ...userValidationForPost] :
//             roleName.includes('vigilante') ? [...watchmanValidationForPost, ...userValidationForPost] :
//                 userValidationForPost;
//     } else if (req.method === 'PUT') {
//         checks = roleName.includes('residente') ? [...residentValidationForPut, ...userValidationForPut] :
//             roleName.includes('vigilante') ? [...watchmanValidationForPut, ...userValidationForPut] :
//                 userValidationForPut;
//     } else {
//         return next();
//     }

//     Promise.all(checks.map(check => check.run(req)))
//         .then(() => next())
//         .catch(next);
// };










// const passwordValidationForPost = [

//     check('password')
//         .isLength({ min: 8, max: 12 }).withMessage('La contraseña debe tener entre 8 y 12 caracteres.')
//         .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/)
//         .withMessage('La contraseña debe contener mayúsculas, minúsculas, números y símbolos.'),

//     check('passwordConfirm')
//         .custom((value, { req }) => {
//             if (value !== req.body.password) {
//                 throw new Error('Las contraseñas no coinciden.');
//             } else {
//                 return true;
//             }
//         })
// ];



// const userPersonalInfoValidationForPut = [

//     check('docType')
//         .optional({ nullable: true })
//         .isString().withMessage('El tipo de documento debe ser una cadena de caracteres.')
//         .isIn(docTypes.map(doc => doc.value)).withMessage('El tipo de documento no es válido.'),

//     check('document')
//         .optional({ nullable: true })
//         .isAlphanumeric().withMessage('El número de documento solo puede contener números.')
//         .custom(async (value, { req }) => {

//             const body = req.body

//             const userById = await UserModel.findOne({ where: { iduser: body.iduser } });
//             const userByDocument = await UserModel.findOne({ where: { document: value } });

//             if (!userById || !userByDocument) {
//                 return true;
//             } else if (userById.document !== userByDocument.document) {
//                 throw new Error(`El documento "${value}" ya está en uso.`);
//             } else {
//                 return true;
//             }



//         }),


//     check('name')
//         .optional({ nullable: true })
//         .isString().withMessage('El nombre debe ser una cadena de caracteres.')
//         .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]+$/).withMessage('El nombre solo puede contener letras y espacios.'),

//     check('lastName')
//         .optional({ nullable: true })
//         .isString().withMessage('El apellido debe ser una cadena de caracteres.')
//         .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]+$/).withMessage('El apellido solo puede contener letras y espacios.'),



//     check('sex')
//         .optional({ nullable: true })
//         .isString().withMessage('El género debe ser una cadena de caracteres.')
//         .isIn(sexs.map(sex => sex.value)).withMessage('El género no es válido.'),

//     check('email')
//         .optional({ nullable: true })
//         .isEmail().withMessage('El correo electrónico debe tener un formato válido.')
//         .custom(async (value, { req }) => {

//             const body = req.body

//             const userById = await UserModel.findOne({ where: { iduser: body.iduser } });
//             const userByEmail = await UserModel.findOne({ where: { email: value } });

//             if (!userById || !userByEmail) {
//                 return true;
//             } else if (userById.email !== userByEmail.email) {
//                 throw new Error(`El email "${value}" ya está en uso.`);
//             } else {
//                 return true;
//             }



//         }),

//     check('phone')
//         .optional({ nullable: true })
//         .isString().withMessage('El teléfono debe ser una cadena de caracteres.')
//         .isLength({ min: 10, max: 13 }).withMessage('El teléfono debe tener entre 10 y 13 caracteres.')
//         .isNumeric().withMessage('El teléfono solo puede contener números.'),

// ];


// module.exports = {
//     userPersonalInfoValidationForPut,
//     userValidationForPost,
//     passwordValidationForPost,
//     userValidations,
// };















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

