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

            const existingResident = await ResidentModel.findOne({ where: { idResident: value, } });

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
                where: { idResident: value, status: 'Active' }
            });

            console.log(existingRecord, 'New validation')


            if (existingRecord && existingRecord.length >= 1) {

                throw new Error('Este residente ya fue asignado a otro apartamento.');

            } else {

                return true;

            }
        })
        .custom(async (value, { req }) => {

            const body = req.body;

            const resident = await ResidentModel.findOne({
                where: { idResident: value, status: 'Active' }
            });

            if (resident) {
                return true;
            } else {
                throw new Error('El residente debe estar activo.');
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

            const existingResident = await ResidentModel.findOne({ where: { idResident: value, status: 'Active' } });

            if (existingResident) {
                return true
            }
            else throw new Error('El residente debe estar activo.');

        })

        .custom(async (value, { req }) => {

            const body = req.body

            const apartmentResident = await ApartmentResidentModel.findOne({
                where: {

                    idResident: value,
                    status: 'Active'

                }
            });

            if(body.status == 'Active' && !apartmentResident) return true
            
            if (apartmentResident?.idApartmentResident !== body.idApartmentResident && body.status == 'Active')
                throw new Error('El residente ya fue asignado a otro apartamento.')

            // return true

        })

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

        })
        .custom((value) => {
            const residentEndDate = new Date(value);
            const today = new Date();

            if (residentEndDate > today) {
                throw new Error('La fecha de fin no puede ser superior a hoy.');
            }
            return true;
        }),

    check('status')
        .isIn(['Active', 'Inactive'])
        .withMessage('El estado del residente no es válido.')

        .custom(async (value, { req }) => {
            const body = req.body;

            const apartmentResident = await ApartmentResidentModel.findOne({
                where: { idApartmentResident: body.idApartmentResident }
            })

            console.log(apartmentResident, value, 'value jeje')

            if (apartmentResident.status == 'Active' && body.residentEndDate && value == 'Inactive') return true;
            if (apartmentResident.status == 'Inactive' && value == 'Active') return true;

            throw new Error('Debe estar inactivo para marcar la fecha de fin.')



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
