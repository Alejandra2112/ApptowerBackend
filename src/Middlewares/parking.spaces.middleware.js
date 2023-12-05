const { check } = require('express-validator');
const ParkingSpacesModel = require('../Models/parking.spaces.model');

const createParkinValidation = [

    // check('parkingName')
    //     .isLength({ min: 3 })
    //     .withMessage('Parking space name must be at least 3 characters.')
    //     .trim()
    //     .matches(/^[a-zA-Z0-9\s]+$/)
    //     .withMessage('Parking space name must contain only letters and numbers.')
    //     .custom(async (value) => {
    //         const existingParking = await ParkingSpacesModel.findOne({ where: { parkingName: value } });

    //         if (existingParking) {
    //             throw new Error('Parking space name is already in use');
    //         }

    //         return true;
    //     }),
    check('parkingType')
        .isIn(['Private', 'Public'])
        .withMessage('Parking space type is not valid.'),
    // check('status')
    //     .isIn(['Active', 'Inactive'])
    //     .withMessage('Status parking spaces is not valid.')


];

const updateParkinValidation = [

    check('parkingName')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Parking space name must be at least 3 characters.')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage('Parking space name must contain only letters and numbers.')
        .custom(async (value, { req }) => {
            const body = req.body;
            const { parkingName } = body;

            const existingParking = await ParkingSpacesModel.findOne({ where: { parkingName: value } });


            if (value === parkingName) {
                return true;
            } else {

                if (existingParking) {
                    throw new Error('Parking space name is already in use');
                }
                return true;

            }

        }),
    check('parkingType')
        .optional()
        .isIn(['Private', 'Public'])
        .withMessage('Parking space type is not valid.'),
    check('status')
        .optional()
        .isIn(['Active', 'Inactive'])
        .withMessage('Status parking spaces is not valid.')


];

module.exports = {

    createParkinValidation,
    updateParkinValidation

}