const { check } = require('express-validator');
const SpacesModel = require('../Models/spaces.model');
const ResidentModel = require('../Models/resident.model');
const OwnersModel = require('../Models/owners.model');


const createSpaceOwnersValidation = [

    check('idSpace')
        .custom(async (value) => {

            const existingSpace = await SpacesModel.findOne({ where: { idSpace: value } });

            if (existingSpace) {
                return true
            }
            else throw new Error('Space not exist.');

        }),

    check('idOwner')
        .custom(async (value) => {

            const existingOwner = await OwnersModel.findOne({ where: { idOwner: value } });

            if (existingOwner) {
                return true
            }
            else throw new Error('Owner not exist.');

        }),



    check('residentStartDate')
        .isDate().withMessage('Invalid date format.')
        .custom((value) => {
            const date = new Date(value);
            const today = new Date();

            if (date > today) {
                throw new Error('The date cannot be in the future.');
            }

            return true;
        }),

    check('residentEndDate')
        .optional()
        .isDate().withMessage('Invalid date format.')
        .custom((value, { req }) => {
            const endDate = new Date(value);
            const startDate = new Date(req.body.OwnershipStartDate);

            if (endDate > startDate) {
                throw new Error('The end date must be greater than or equal to the start date.');
            }

            return true;
        }),
    check('status')
        .default('Active')
        .isIn(['Active', 'Inactive'])
        .withMessage('Status spaces is not valid.')



]

const updateSpaceOwnersValidation = [

    check('idSpace')
        .custom(async (value) => {

            const existingSpace = await SpacesModel.findOne({ where: { idSpace: value } });

            if (existingSpace) {
                return true
            }
            else throw new Error('Space not exist.');

        }),

        check('idOwner')
        .custom(async (value) => {

            const existingOwner = await OwnersModel.findOne({ where: { idOwner: value } });

            if (existingOwner) {
                return true
            }
            else throw new Error('Owner not exist.');

        }),



    check('OwnershipStartDate')
        .isDate().withMessage('Invalid date format.')
        .custom((value) => {
            const date = new Date(value);
            const today = new Date();

            if (date > today) {
                throw new Error('The date cannot be in the future.');
            }

            return true;
        }),

    check('OwnershipEndDate')
        .optional()
        .isDate().withMessage('Invalid date format.')
        .custom((value, { req }) => {
            const endDate = new Date(value);
            const startDate = new Date(req.body.OwnershipStartDate);

            if (endDate > startDate) {
                throw new Error('The end date must be greater than or equal to the start date.');
            }

            return true;
        }),
    check('status')
        .default('Active')
        .isIn(['Active', 'Inactive'])
        .withMessage('Status spaces is not valid.')

]

module.exports = {

    createSpaceOwnersValidation,
    updateSpaceOwnersValidation

}