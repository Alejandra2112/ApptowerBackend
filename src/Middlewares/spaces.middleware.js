const { check, validationResult } = require('express-validator');
const SpacesModel = require('../Models/spaces.model');


const spacesCreateValidation = [

    check('spaceType')
        .isIn(['Apartament', 'Social area', 'Wet area'])
        .withMessage('Space type is not valid.'),

    check('spaceName')
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage('Space name must be between 3 and 50 characters.')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage('Space name must contain only letters and numbers.')
        .custom(async (value) => {
            const existingSpace = await SpacesModel.findOne({ where: { spaceName: value } });

            if (existingSpace) {
                throw new Error('Space name is already in use');
            }

            return true;
        }),

    check('area')
        .optional()
        .isNumeric({ min: 0 })
        .withMessage('Area must be a number.'),

    check('capacity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Capacity must be a positive integer.'),

    check('status')
        .isIn(['Active', 'Inactive'])
        .withMessage('Status spaces is not valid.')
];

const spacesUpdateValidation = [

    check('spaceType')
        .optional()
        .isIn(['Apartament', 'Social area', 'Wet area'])
        .withMessage('Space type is not valid.'),

    check('spaceName')
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage('Space name must be between 3 and 50 characters.')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage('Space name must contain only letters and numbers.')

        .custom(async (value, { req }) => {
            const body = req.body;
            const { spaceName } = body;

            const existingSpace = await SpacesModel.findOne({ where: { spaceName: value } });


            if (value === spaceName) {
                return true;
            } else {

                if (existingSpace) {
                    throw new Error('Space name is already in use');
                }
                return true;

            }

        }),


    check('area')
        .optional()
        .isNumeric({ min: 0 })
        .withMessage('Area must be a number.'),

    check('capacity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Capacity must be a positive integer.'),

    check('status')
        .optional()
        .isIn(['Active', 'Inactive'])
        .withMessage('Status spaces is not valid.')
];

module.exports = {

    spacesCreateValidation,
    spacesUpdateValidation
}