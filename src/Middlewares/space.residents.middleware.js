const { check } = require('express-validator');
const SpacesModel = require('../Models/spaces.model');
const ResidentModel = require('../Models/resident.model');


const createSpaceResidentValidation = [

    check('idSpace')
        .custom(async (value) => {

            const existingSpace = await SpacesModel.findOne({ where: { idSpace: value } });

            if (existingSpace) {
                return true
            }
            else throw new Error('Space not exist.');

        }),

    check('idResident')
        .custom(async (value) => {

            const existingResident = await ResidentModel.findOne({ where: { idResident: value } });

            if (existingResident) {
                return true
            }
            else throw new Error('Resident not exist.');

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

const updateSpaceResidentValidation = [

    check('idSpace')
        .custom(async (value) => {

            const existingSpace = await SpacesModel.findOne({ where: { idSpace: value } });

            if (existingSpace) {
                return true
            }
            else throw new Error('Space not exist.');

        }),

    check('idResident')
        .custom(async (value) => {

            const existingResident = await ResidentModel.findOne({ where: { idResident: value } });

            if (existingResident) {
                return true
            }
            else throw new Error('Resident not exist.');

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
        .isIn(['Active', 'Inactive'])
        .withMessage('Status spaces is not valid.')

]

module.exports = {

    createSpaceResidentValidation,
    updateSpaceResidentValidation

}
