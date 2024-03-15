const { check } = require('express-validator');

const ApartmentModel = require("../Models/apartment.model");
const ParkingSpacesModel = require("../Models/parking.spaces.model");
const AssignedParking = require('../Models/assigned.parking.model');

const assignedParkingValidationForPost = [

    // check('idApartment')
    //     .notEmpty().withMessage('El ID del apartamento es obligatorio.')
    //     .isInt().withMessage('El ID del apartamento es obligatorio.')
    //     .custom(async (value) => {

    //         const existingApartment = await ApartmentModel.findOne({ where: { idApartment: value } });

    //         if (existingApartment) {
    //             return true
    //         }
    //         else throw new Error('El apartamento selecionado no esta en el sistema.');

    //     }),


    check('idParkingSpace')
        .optional()
        .isInt().withMessage('El ID del espacio de estacionamiento debe ser un número entero positivo.')
        .custom(async (value) => {
            const parkingSpace = await ParkingSpacesModel.findOne({ where: { idParkingSpace: value } });
            if (parkingSpace) {
                return true;
            }
            throw new Error(`El parqueadero no esta en el sistema`);

        })
        .custom(async (value, { req }) => {

            const body = req.body;

            const parkingSpace = await ParkingSpacesModel.findOne({
                where: { idParkingSpace: value, status: 'Active' }
            });

            if (parkingSpace) {
                return true;
            } else {
                throw new Error('El parqueadero debe estar activo.');
            }
        })
        .custom(async (value, { req }) => {

            const body = req.body;

            const existingRecord = await AssignedParking.findOne({
                where: { idParkingSpace: value, idApartment: body.idApartment }
            });

            if (existingRecord) {
                throw new Error('Este parqueadero ya fue asignado a este apartamento.');
            } else {
                return true;
            }
        })

        // Validation to ensure that a resident is not assigned to another apartment

        .custom(async (value, { req }) => {

            const existingRecord = await AssignedParking.findAll({
                where: { idParkingSpace: value }
            });


            if (existingRecord && existingRecord.length >= 1) {

                throw new Error('Este parqueadero ya fue asignado a otro apartamento.');

            } else {

                return true;

            }
        }),

]


const assignedParkingValidationForPut = [


    // check('idApartment')
    //     .notEmpty().withMessage('El ID del apartamento es obligatorio.')
    //     .isInt().withMessage('El ID del apartamento es obligatorio.')
    //     .custom(async (value) => {

    //         const existingApartment = await ApartmentModel.findOne({ where: { idApartment: value } });

    //         if (existingApartment) {
    //             return true
    //         }
    //         else throw new Error('El apartamento selecionado no esta en el sistema.');

    //     }),



    check('idParkingSpace')
        .notEmpty().withMessage('El ID del espacio de estacionamiento es obligatorio.')
        .isInt().withMessage('El ID del espacio de estacionamiento debe ser un número entero positivo.')
        .custom(async (value) => {
            const parkingSpace = await ParkingSpacesModel.findOne({ where: { idParkingSpace: value } });
            if (parkingSpace) {
                return true;
            }
            throw new Error(`El parqueadero no esta en el sistema`);

        })

        .custom(async (value, { req }) => {

            const body = req.body;

            const parkingSpace = await ParkingSpacesModel.findOne({
                where: { idParkingSpace: value, status: 'Active' }
            });

            if (parkingSpace) {
                return true;
            } else {
                throw new Error('El parqueadero debe estar activo.');
            }
        })
        .custom(async (value, { req }) => {

            const body = req.body;

            const existingRecord = await AssignedParking.findOne({
                where: { idParkingSpace: value, idApartment: body.idApartment }
            });

            if (existingRecord) {
                throw new Error('Este parqueadero ya fue asignado a este apartamento.');
            } else {
                return true;
            }
        })

        // Validation to ensure that a resident is not assigned to another apartment

        .custom(async (value, { req }) => {

            const existingRecord = await AssignedParking.findAll({
                where: { idParkingSpace: value }
            });


            if (existingRecord && existingRecord.length >= 1) {

                throw new Error('Este parqueadero ya fue asignado a otro apartamento.');

            } else {

                return true;

            }
        }),
];


module.exports = {

    assignedParkingValidationForPost,
    assignedParkingValidationForPut

}