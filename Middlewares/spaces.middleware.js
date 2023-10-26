const { check, validationResult } = require('express-validator')

const validation = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json(errors)
    }

    next()

}

const validationSpaces = [
    check('spaceType')
        .isIn(['Apartament', 'Social area', 'Wet area'])
        .withMessage('Space type is not valid.'),

    check('spaceName')
        .isLength({ min: 3, max: 50 })
        .withMessage('Space name must be between 3 and 50 characters.'),

    check('area')
        .optional()
        .isNumeric()
        .withMessage('Area must be a number.'),

    check('capacity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Capacity must be a positive integer.'),

    check('status')
        .isIn(['Active', 'Inactive'])
        .withMessage('Status spaces is not valid.')
];

module.exports = {

    validationSpaces,
    validation
}