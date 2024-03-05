const { check, validationResult } = require('express-validator');


const residentValidationForPost = [
    check('iduser')
        .isNumeric()
        .withMessage('El id del usuario es requerido.'),

    check('residentType')
        .isIn(['tenant', 'owner'])
        .withMessage('El tipo de residente es inválido. Debe ser "tenant" o "owner".'),

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

const residentValidations = (req, res, next) => {
    let checks = [];
    if (req.method === 'POST') {
        checks = residentValidationForPost;
    } else if (req.method === 'PUT') {
        checks = residentValidationForPut;
    }
    return checks;
};

module.exports = {residentValidations};