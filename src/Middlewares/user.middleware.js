const { check, validationResult } = require('express-validator');

const userValidationForPost = [
    check('docType')
        .isLength({ min: 2, max: 2 }).withMessage('El tipo de documento debe tener 2 caracteres.')
        .matches(/^(CC|CE|PA)$/, 'i').withMessage('Tipo de documento inválido.'),


    check('document')
        .isLength({ min: 8, max: 13 }).withMessage('El documento debe tener entre 8 y 13 números.'),


    check('name')
        .notEmpty().withMessage('El nombre es requerido.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/, 'i').withMessage('El nombre no puede contener caracteres especiales.'),


    check('lastName')
        .notEmpty().withMessage('El apellido es requerido.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/, 'i').withMessage('El apellido no puede contener caracteres especiales.'),


    check('idrole')
        .isNumeric().withMessage('El rol es requerido.'),


    check('password')
        .isLength({ min: 8, max: 12 }).withMessage('La contraseña debe tener entre 8 y 12 caracteres.'),


    check('email')
        .isEmail().withMessage('El correo es inválido.'),


    check('phone')
        .isLength({ min: 10, max: 10 }).withMessage('El teléfono debe tener 10 números.')
        .matches(/^[0-9]*$/, 'i').withMessage('Solo se permiten números.'),


    // check('birthday')
    //     .isDate().withMessage('La fecha de nacimiento es requerida.'),


    check('sex')
        .matches(/^(M|F|O|No proporcionado)$/, 'i').withMessage('Sexo inválido.'),
];

const userValidationForPut = [
    check('docType')
        .isLength({ min: 2, max: 2 }).withMessage('El tipo de documento debe tener 2 caracteres.')
        .matches(/^(CC|CE|PA)$/, 'i').withMessage('Tipo de documento inválido.'),


    check('document')
        .isLength({ min: 8, max: 13 }).withMessage('El documento debe tener entre 8 y 13 números.'),


    check('name')
        .notEmpty().withMessage('El nombre es requerido.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/, 'i').withMessage('El nombre no puede contener caracteres especiales.'),


    check('lastName')
        .notEmpty().withMessage('El apellido es requerido.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóú\s]*$/, 'i').withMessage('El apellido no puede contener caracteres especiales.'),


    check('idrole')
        .isNumeric().withMessage('El rol es requerido.'),


    check('password')
        .isLength({ min: 8, max: 12 }).withMessage('La contraseña debe tener entre 8 y 12 caracteres.'),


    check('email')
        .isEmail().withMessage('El correo es inválido.'),


    check('phone')
        .isLength({ min: 10, max: 10 }).withMessage('El teléfono debe tener 10 números.')
        .matches(/^[0-9]*$/, 'i').withMessage('Solo se permiten números.'),


    check('birthday')
        .isDate().withMessage('La fecha de nacimiento es requerida.'),


    check('sex')
        .matches(/^(M|F|O|No proporcionado)$/, 'i').withMessage('Sexo inválido.'),


    check('state')
        .matches(/^(Activo|Inactivo)$/, 'i').withMessage('Estado inválido.'),
];

const userValidations = (req, res, next) => {
    let checks;
    if (req.method === 'POST') {
        checks = userValidationForPost;
    } else if (req.method === 'PUT') {
        checks = userValidationForPut;
    } else {
        return next();
    }
    Promise.all(checks.map(check => check.run(req)))
        .then(() => next())
        .catch(next);
};

module.exports = {
    userValidations,
};