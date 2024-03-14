const { check, validationResult } = require('express-validator');
const SpacesModel = require('../Models/spaces.model');


const spaceValidationForPost = [

    check('spaceType')
        .notEmpty().withMessage('El tipo de espacio es obligatorio.')
        .isIn(['Social area', 'Wet area']).withMessage('Tipo de zona comun no es valida.'),

    check('spaceName')
        .notEmpty().withMessage('El nombre de la zona comun es obligatorio.')
        .isLength({ min: 3, max: 50 })
        .withMessage('Nombre de la zona comun debe tener entre 3 y 50 caracteres.')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage('Nombre de la zona comun solo debe tener numeros y letras.')
        .custom(async (value) => {
            const existingSpace = await SpacesModel.findOne({ where: { spaceName: value } });

            if (existingSpace) {
                throw new Error(`Nombre del la zona comun "${value}" ya está en uso.`);
            }

            return true;
        }),


    check('openingTime')
        .notEmpty().withMessage('La hora de apertura es obligatoria.')
        .custom((value) => {

            const openingTime = new Date(`1970-01-01T${value}:00`);
            const minimumTime = new Date(`1970-01-01T06:00:00`);

            if (openingTime < minimumTime) {
                throw new Error('La hora de apertura debe ser a las 6:00 AM o posterior.');
            }

            return true;
        }),
    check('closingTime')
        .notEmpty().withMessage('La hora de cierre es obligatoria.')
        .custom((value, { req }) => {

            const openingTime = req.body.openingTime;

            const timeDiff = new Date(`1970-01-01T${value}:00`) - new Date(`1970-01-01T${openingTime}:00`);
            const diffInHours = timeDiff / (1000 * 60 * 60);

            if (value <= openingTime) {
                throw new Error('La hora de cierre debe ser posterior a la hora de apertura.');
            }

            if (diffInHours > 24) {
                throw new Error('La diferencia entre la hora de apertura y la hora de cierre no puede superar las 24 horas.');
            }

            return true;
        }),


    check('minTime')
        .notEmpty().withMessage('El tiempo mínimo es obligatorio.')
        .isInt({ min: 1, max: 24 }).withMessage('El tiempo mínimo debe ser un número entero entre 1 y 24.'),

    check('maxTime')
        .notEmpty().withMessage('El tiempo máximo es obligatorio.')
        .isInt({ min: 1, max: 24 }).withMessage('El tiempo máximo debe ser un número entero entre 1 y 24.')
        .custom((value, { req }) => {
            const minTime = req.body.minTime;
            if (parseInt(value) < parseInt(minTime)) {
                throw new Error('El tiempo máximo no puede ser menor que el tiempo mínimo.');
            }
            return true;
        }),



    check('area')
        .notEmpty().withMessage('El area de la zona comun es obligatorio.')
        .isNumeric({ min: 0 })
        .withMessage('Area debe ser un numero.'),
    check('capacity')
        .notEmpty().withMessage('La capacidad de la zona comun es obligatorio.')
        .isInt({ min: 0 })
        .withMessage('Capacidad debe ser un numero entero.'),


];

const spaceValidationForPut = [


    check('spaceType')
        .optional()
        .isIn(['Social area', 'Wet area'])
        .withMessage('Tipo de zona comun no es valida.'),

    check('spaceName')
        .isLength({ min: 3, max: 50 })
        .withMessage('Nombre de la zona comun debe tener entre 3 y 50 caracteres.')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage('Nombre de la zona comun solo debe tener numeros y letras.')

        .custom(async (value, { req }) => {

            const body = req.body

            const existingSpaceById = await SpacesModel.findOne({ where: { idSpace: body.idSpace } });
            const existingSpaceByName = await SpacesModel.findOne({ where: { spaceName: value } });

            if (!existingSpaceById || !existingSpaceByName) {
                return true;
            } else if (existingSpaceById.spaceName !== existingSpaceByName.spaceName) {
                throw new Error(`Nombre del la zona comun "${value}" ya está en uso.`);
            } else {
                return true;
            }



        }),

    check('openingTime')
        .optional()
        .custom((value) => {

            const openingTime = new Date(`1970-01-01T${value}:00`);
            const minimumTime = new Date(`1970-01-01T06:00:00`);

            if (openingTime < minimumTime) {
                throw new Error('La hora de apertura debe ser a las 6:00 AM o posterior.');
            }

            return true;
        }),
    check('closingTime')
        .optional()
        .custom((value, { req }) => {

            const openingTime = req.body.openingTime;

            const timeDiff = new Date(`1970-01-01T${value}:00`) - new Date(`1970-01-01T${openingTime}:00`);
            const diffInHours = timeDiff / (1000 * 60 * 60);

            if (value <= openingTime) {
                throw new Error('La hora de cierre debe ser posterior a la hora de apertura.');
            }

            if (diffInHours > 24) {
                throw new Error('La diferencia entre la hora de apertura y la hora de cierre no puede superar las 24 horas.');
            }

            return true;
        }),


    check('minTime')
        .optional()
        .isInt({ min: 1, max: 24 }).withMessage('El tiempo mínimo debe ser un número entero entre 1 y 24.'),

    check('maxTime')
        .optional()
        .isInt({ min: 1, max: 24 }).withMessage('El tiempo máximo debe ser un número entero entre 1 y 24.')
        .custom((value, { req }) => {
            const minTime = req.body.minTime;
            if (parseInt(value) < parseInt(minTime)) {
                throw new Error('El tiempo máximo no puede ser menor que el tiempo mínimo.');
            }
            return true;
        }),




    check('area')
        .optional()
        .isNumeric({ min: 0 })
        .withMessage('Area debe ser un numero.'),

    check('capacity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Capacidad debe ser un numero entero.'),

    check('status')
        .isIn(['Active', 'Inactive'])
        .withMessage('El estado no es válido.')
];

module.exports = {

    spaceValidationForPost,
    spaceValidationForPut
}