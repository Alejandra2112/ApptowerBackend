const { check } = require('express-validator');
const SpacesModel = require('../Models/spaces.model');
const ResidentModel = require('../Models/resident.model');
const OwnersModel = require('../Models/owners.model');
const ApartmentModel = require('../Models/apartment.model');


const apartmentOwnerValidationForPost = [

    // check('idApartment')
    //     .custom(async (value) => {

    //         const existingSpace = await SpacesModel.findOne({ where: { idSpace: value } });

    //         if (existingSpace) {
    //             return true
    //         }
    //         else throw new Error('Space not exist.');

    //     }),

    // check('idOwner')
    //     .custom(async (value) => {

    //         const existingOwner = await OwnersModel.findOne({ where: { idOwner: value } });

    //         if (existingOwner) {
    //             return true
    //         }
    //         else throw new Error('Owner not exist.');

    //     }),



    // // check('residentStartDate')
    // //     .isDate().withMessage('Invalid date format.')
    // //     .custom((value) => {
    // //         const date = new Date(value);
    // //         const today = new Date();

    // //         if (date > today) {
    // //             throw new Error('The date cannot be in the future.');
    // //         }

    // //         return true;
    // //     }),

    // // check('residentEndDate')
    // //     .optional()
    // //     .isDate().withMessage('Invalid date format.')
    // //     .custom((value, { req }) => {
    // //         const endDate = new Date(value);
    // //         const startDate = new Date(req.body.OwnershipStartDate);

    // //         if (endDate > startDate) {
    // //             throw new Error('The end date must be greater than or equal to the start date.');
    // //         }

    // //         return true;
    // //     }),
    // check('status')
    //     .default('Active')
    //     .isIn(['Active', 'Inactive'])
    //     .withMessage('Status spaces is not valid.')



]

const apartmentOwnerValidationForPut = [

    check('idApartment')
        .notEmpty().withMessage('El apartamento es obligatorio.')
        .isInt().withMessage('El ID de la apartamento debe ser un número entero positivo.')

        .custom(async (value) => {

            const existingApartment = await ApartmentModel.findOne({ where: { idApartment: value } });

            if (existingApartment) {
                return true
            }
            else throw new Error('El apartamento selecionado no esta en el sistema.');

        }),

    check('idOwner')
        .notEmpty().withMessage('El propietario es obligatorio.')
        .isInt().withMessage('El ID de la torre debe ser un número entero positivo.')

        .custom(async (value) => {

            const existingOwner = await OwnersModel.findOne({ where: { idOwner: value } });

            if (existingOwner) {
                return true
            }
            else throw new Error('El propietario selecionado no esta en el sistema');

        }),


    check('OwnershipStartDate')
        .notEmpty().withMessage('La fecha de inicio es obligatorio.')
        .custom((value) => {

            const OwnershipStartDate = new Date(value);
            const today = new Date();

            if (OwnershipStartDate > today) {
                throw new Error('La fecha no puede ser mayor a hoy.');
            }

            return true;
        }),

    check('OwnershipEndDate')
        .notEmpty().withMessage('La fecha de fin es obligatorio.')
        .custom((value, { req }) => {
            const OwnershipEndDate = new Date(value);
            const OwnershipStartDate = new Date(req.body.OwnershipStartDate);
            if (OwnershipEndDate < OwnershipStartDate && status === 'Active') {
                throw new Error('La fecha de fin debe ser mayor a la fecha de inicio.');
            }
            return true;

        }),

    check('status')
        .isIn(['Active', 'Inactive'])
        .withMessage('El estado del propietario no es válido.')
        .custom((value, { req }) => {
            const status = req.body.status;

            console.log( status, 'estado')
            if (status === 'Active') throw new Error('Debe estar inactivo paramarcar la fecha de fin.')
            
            return true;

        }),

]

module.exports = {

    apartmentOwnerValidationForPut,


}