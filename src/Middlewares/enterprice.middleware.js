const { check, validationResult } = require('express-validator');
const EnterpriseSecurity = require("../Models/enterprice.security.model");

const postEnterpriceValidations = [
    check('nameEnterprice')
        .notEmpty().withMessage('El nombre es requerido.')
        .isLength({ min: 3, max: 25 }).withMessage('Debe tener entre 3 y 25 caracteres.'),
    check('NIT')
        .notEmpty().withMessage('El NIT es requerido.')
        .isLength({ min: 9, max: 12 }).withMessage('Debe tener entre 9 y 12 caracteres.')
        .custom(async (value) => {
            const enterprice = await EnterpriseSecurity.findOne({ where: { NIT: value } });
            if (enterprice) {
                return Promise.reject('Ya existe una empresa con este NIT.');
            }
        }),

    check('address')
        .notEmpty().withMessage('La dirección es requerida.')
        .isLength({ min: 5, max: 20 }).withMessage('Debe tener entre 5 y 20 caracteres.'),

    check('phone')
        .notEmpty().withMessage('El teléfono es requerido.')
        .isLength({ min: 10, max: 10 }).withMessage('El teléfono tener 10 caracteres.')
        .isNumeric().withMessage('El teléfono debe ser un número.'),

    check('email')
        .notEmpty().withMessage('El correo es requerido.')
        .isEmail().withMessage('El correo es inválido.')
        .custom(async (value) => {
            const enterprice = await EnterpriseSecurity.findOne({ where: { email: value } });
            if (enterprice) {
                return Promise.reject('Ya existe una empresa con este correo.');
            }
        }),

];

const putEnterpriceValidations = [
    check('nameEnterprice')
        .isLength({ min: 3, max: 25 }).withMessage('El nombre debe tener entre 3 y 25 caracteres.'),
    check('NIT')
        .notEmpty().withMessage('El NIT es requerido.')
        .isLength({ min: 9, max: 12 }).withMessage('El NIT debe tener entre 9 y 12 caracteres.'),
    // .custom(async (value) => {
    //     const enterprice = await EnterpriseSecurity.findOne({ where: { NIT: value } });
    //     if (enterprice) {
    //         return Promise.reject('Ya existe una empresa con este NIT.');
    //     }
    // }),
    check('address')
        .isLength({ min: 5, max: 20 }).withMessage('la dirección tener entre 5 y 20 caracteres.'),
    check('phone')
        .isLength({ min: 10, max: 13 }).withMessage('El telefono debe tener entre 10 y 13 números.')
        .isNumeric().withMessage('El teléfono debe ser un número.'),
    check('email')
        .isEmail().withMessage('El correo es inválido.')
        .notEmpty().withMessage('El correo es requerido.'),
    // .custom(async (value) => {
    //     const enterprice = await EnterpriseSecurity.findOne({ where: { email: value } });
    //     if (enterprice) {
    //         return Promise.reject('Ya existe una empresa con este correo.');
    //     }
    // }),
    check('state')
        .matches(/^(Activo|Inactivo)$/).withMessage('Estado invalido')
];



module.exports = {
    postEnterpriceValidations,
    putEnterpriceValidations,
};