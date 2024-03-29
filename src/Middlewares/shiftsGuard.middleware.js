const { check, validationResult } = require('express-validator');

const postShiftsValidations = [
    check('start')
        .notEmpty().withMessage('La hora de inicio es requerida'),
    check('end')
        .notEmpty().withMessage('La hora de fin es requerida'),

];

const putShiftsValidations = [
    check('start')
        .notEmpty().withMessage('La hora de inicio es requerida'),
    check('end')
        .notEmpty().withMessage('La hora de fin es requerida'),

];

module.exports = { postShiftsValidations, putShiftsValidations };
