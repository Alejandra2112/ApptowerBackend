const { check, validationResult } = require('express-validator');
const SpacesModel = require('../Models/spaces.model');


const spaceValidationForPost = [

    check('spaceType')
        .notEmpty().withMessage('El tipo de la zona comun es obligatorio.'),

    //     .isIn(['Social area', 'Wet area'])
    //     .withMessage('Tipo de zona comun no es valida.'),

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

    check('area')
        .notEmpty().withMessage('El area de la zona comun es obligatorio.')
        .isNumeric({ min: 0 })
        .withMessage('Area debe ser un numero.'),

    check('capacity')
        .notEmpty().withMessage('La capacidad de la zona comun es obligatorio.')
        .isInt({ min: 0 })
        .withMessage('Capacidad debe ser un numero entero.'),

    // check('schedule')
    //     .notEmpty().withMessage('El horario es obligatorio.')



];

const spaceValidationForPut = [


    check('spaceType')
        .optional(),
    // .isIn(['Social area', 'Wet area'])
    // .withMessage('Tipo de zona comun no es valida.'),

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




    check('area')
        .optional()
        .isNumeric({ min: 0 })
        .withMessage('Area debe ser un numero.'),

    check('capacity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Capacity must be a positive integer.'),

    check('status')
        .isIn(['Active', 'Inactive'])
        .withMessage('El estado no es válido.')
];

module.exports = {

    spaceValidationForPost,
    spaceValidationForPut
}