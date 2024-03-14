const { check } = require('express-validator');
const SpacesModel = require('../Models/spaces.model');
const OwnersModel = require('../Models/owners.model');
const ApartmentOwnerModel = require('../Models/apartment.owners.model');



const apartmentOwnerValidationForPost = [

    check('idOwner')
        .notEmpty().withMessage('El propietario es obligatorio.')
        .isInt().withMessage('El ID del propietario debe ser un número entero positivo.')
        .custom(async (value) => {

            const existingOwner = await OwnersModel.findOne({ where: { idOwner: value } });

            if (existingOwner) {
                return true
            }
            else throw new Error('El propietario selecionado no esta en el sistema.');

        })

        // Validation to prevent a owner from being registered more than once in the same apartment

        .custom(async (value, { req }) => {

            const body = req.body;

            const existingRecord = await ApartmentOwnerModel.findOne({
                where: { idOwner: value, idApartment: body.idApartment }
            });

            if (existingRecord) {
                throw new Error('Este propietario ya fue asignado a este apartamento.');
            } else {
                return true;
            }
        })

        .custom(async (value, { req }) => {

            const body = req.body;

            const owner = await OwnersModel.findOne({
                where: { idOwner: value, status: 'Active' }
            });

            if (owner) {
                return true;
            } else {
                throw new Error('El propietario debe estar activo.');
            }
        }),



    check('OwnershipStartDate')
        .notEmpty().withMessage('La fecha de inicio es obligatorio.')
        .custom((value) => {
            const OwnershipStartDate = new Date(value);
            const today = new Date();

            if (OwnershipStartDate > today) {
                throw new Error('La fecha de inicicio no puede ser superior a hoy.');
            }
            return true;
        }),




]

const apartmentOwnerValidationForPut = [


    check('idOwner')
        .notEmpty().withMessage('El propietario es obligatorio.')
        .isInt().withMessage('El ID de la torre debe ser un número entero positivo.')

        .custom(async (value) => {

            const existingOwner = await OwnersModel.findOne({ where: { idOwner: value } });

            if (existingOwner) {
                return true
            }
            else throw new Error('El propietario selecionado no esta en el sistema');

        })
        .custom(async (value, { req }) => {

            const body = req.body;

            const owner = await OwnersModel.findOne({
                where: { idOwner: value, status: 'Active' }
            });

            if (owner) {
                return true;
            } else {
                throw new Error('El propietario debe estar activo.');
            }
        }),


    // check('OwnershipStartDate')
    //     .notEmpty().withMessage('La fecha de inicio es obligatorio.')
    //     .custom((value) => {

    //         const OwnershipStartDate = new Date(value);
    //         const today = new Date();

    //         if (OwnershipStartDate > today) {
    //             throw new Error('La fecha no puede ser mayor a hoy.');
    //         }

    //         return true;
    //     }),

    check('OwnershipEndDate')
        .notEmpty().withMessage('La fecha de fin es obligatorio.')
        .custom((value, { req }) => {
            const OwnershipEndDate = new Date(value);
            const OwnershipStartDate = new Date(req.body.OwnershipStartDate);
            if (OwnershipEndDate < OwnershipStartDate && status === 'Active') {
                throw new Error('La fecha de fin debe ser mayor a la fecha de inicio.');
            }
            return true;

        })
        .custom((value) => {
            const OwnershipEndDate = new Date(value);
            const today = new Date();

            if (OwnershipEndDate > today) {
                throw new Error('La fecha de fin no puede ser superior a hoy.');
            }
            return true;
        }),

    check('status')
        .isIn(['Active', 'Inactive'])
        .withMessage('El estado del propietario no es válido.')
        .custom(async (value, { req }) => {
            const body = req.body;

            const apartmentOwner = await ApartmentOwnerModel.findOne({
                where: { idApartmentOwner: body.idApartmentOwner }
            })

            console.log(apartmentOwner, value, 'value jeje')

            if (apartmentOwner.status == 'Active'&& body.OwnershipEndDate && value == 'Inactive') return true;
            if (apartmentOwner.status == 'Inactive' && value == 'Active') return true;

            throw new Error('Debe estar inactivo para marcar la fecha de fin.')



        }),

]


const OwnershipStartDateValidationForPost = [

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
]

const apartmentOwnerValidationForDelete = [

    check('idApartmentOwner')
        .notEmpty().withMessage('El ID es obligatorio.')
        .isInt().withMessage('El ID debe ser un número entero positivo.')
    // .custom(async (value, { req }) => {

    //     const body = req.body;

    //     console.log(value, 'value')
    //     const apartmentOwner = await ApartmentOwnerModel.findOne({
    //         idApartmentOwner: body.idApartmentOwner, status: 'Active'
    //     })

    //     if (apartmentOwner && value == 'Inactive') {
    //         throw new Error('No se puede realizar esta acción porque el propi está actualmente activo en el apartamento.')
    //     }

    //     return true
    // })
]

module.exports = {

    apartmentOwnerValidationForPost,
    apartmentOwnerValidationForPut,
    OwnershipStartDateValidationForPost,
    apartmentOwnerValidationForDelete
}