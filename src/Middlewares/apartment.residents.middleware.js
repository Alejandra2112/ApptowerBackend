const { check } = require('express-validator');
const SpacesModel = require('../Models/spaces.model');
const ResidentModel = require('../Models/resident.model');
const ApartmentResidentModel = require('../Models/apartment.residents.model');
const ApartmentModel = require('../Models/apartment.model');


const apartmentResidentValidationForPost = [

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


    check('idResident')
        .notEmpty().withMessage('El residente es obligatorio.')
        .isInt().withMessage('El ID del residente debe ser un número entero positivo.')
        .custom(async (value) => {

            const existingResident = await ResidentModel.findOne({ where: { idResident: value } });

            if (existingResident) {
                return true
            }
            else throw new Error('El residente selecionado no esta en el sistema.');

        })

        // Validation to prevent a resident from being registered more than once in the same apartment

        .custom(async (value, { req }) => {

            const body = req.body;

            const existingRecord = await ApartmentResidentModel.findOne({
                where: { idResident: value, idApartment: body.idApartment }
            });

            if (existingRecord) {
                throw new Error('Este residente ya fue asignado a este apartamento.');
            } else {
                return true;
            }
        })

        // Validation to ensure that a resident is not assigned to another apartment

        .custom(async (value, { req }) => {

            const body = req.body;

            const existingRecord = await ApartmentResidentModel.findAll({
                where: { idResident: value }
            });

            console.log(existingRecord, 'New validation')


            if (existingRecord && existingRecord.length >= 1 && existingRecord[0].status == 'Active') {

                throw new Error('Este residente ya fue asignado a otro apartamento.');

            } else {

                return true;

            }
        }),







]

const residentStartDateValidationForPost = [

    check('residentStartDate')
        .notEmpty().withMessage('La fecha de inicio es obligatorio.')
        .custom((value) => {
            const residentStartDate = new Date(value);
            const today = new Date();

            if (residentStartDate > today) {
                throw new Error('La fecha de inicicio no puede ser superior a hoy.');
            }
            return true;
        }),

]

const apartmentResidentValidationForPut = [

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


    check('idResident')
        .optional()
        .isInt().withMessage('El ID del residente debe ser un número entero positivo.')
        .custom(async (value) => {

            const existingResident = await ResidentModel.findOne({ where: { idResident: value } });

            if (existingResident) {
                return true
            }
            else throw new Error('El residente selecionado no esta en el sistema.');

        })

    // // Validation to prevent a resident from being registered more than once in the same apartment

    // .custom(async (value, { req }) => {

    //     const body = req.body;

    //     const existingRecord = await ApartmentResidentModel.findOne({
    //         where: { idResident: value, idApartment: body.idApartment }
    //     });

    //     if (existingRecord) {
    //         throw new Error('Este residente ya fue asignado a este apartamento apartamento.');
    //     } else {
    //         return true;
    //     }
    // })

    // Validation to ensure that a resident is not assigned to another apartment

    // .custom(async (value, { req }) => {

    //     const body = req.body;

    //     const existingRecord = await ApartmentResidentModel.findAll({
    //         where: { idResident: value }
    //     });

    //     console.log(existingRecord, 'New validation')


    //     if (existingRecord && existingRecord.length >= 1) {

    //         throw new Error('Este residente ya fue asignado a otro apartamento.');

    //     } else {

    //         return true;

    //     }
    // })
    ,




    check('residentStartDate')
        .notEmpty().withMessage('La fecha de inicio es obligatorio.')
        .custom((value) => {
            const residentStartDate = new Date(value);
            const today = new Date();

            if (residentStartDate > today) {
                throw new Error('La fecha de inicicio no puede ser superior a hoy.');
            }
            return true;
        }),

    check('residentEndDate')
        .notEmpty().withMessage('La fecha de fin es obligatorio.')
        .custom((value, { req }) => {
            const residentEndDate = new Date(value);
            const residentStartDate = new Date(req.body.residentStartDate);

            console.log(residentEndDate >= residentStartDate, residentStartDate, residentEndDate)
            if (residentEndDate <= residentStartDate) {
                throw new Error('La fecha de fin debe ser mayor a la fecha de inicio.');
            }
            return true;

        }),
    check('status')
        .isIn(['Active', 'Inactive'])
        .withMessage('El estado del propietario no es válido.')
        .custom((value, { req }) => {
            const status = req.body.status;

            console.log(status, 'estado')
            if (status === 'Active') throw new Error('Debe estar inactivo paramarcar la fecha de fin.')

            return true;

        }),

]

const apartmentResidentValidationForDelete = [

    check('idApartmentResident')
        .notEmpty().withMessage('El ID es obligatorio.')
        .isInt().withMessage('El ID debe ser un número entero positivo.')
    // .custom(async (value) => {

    //     const apartmentResident = await ApartmentResidentModel.findOne({ idApartmentResident: value })

    //     console.log(apartmentResident, 'apartmentResident')
    //     if (apartmentResident && apartmentResident.status == 'Active') {
    //         throw new Error('No se puede realizar esta acción porque el residente está actualmente activo en el apartamento.')
    //     }

    //     return true
    // })
]

module.exports = {

    apartmentResidentValidationForPost,
    apartmentResidentValidationForPut,
    apartmentResidentValidationForDelete,
    residentStartDateValidationForPost

}
