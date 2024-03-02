const { check } = require('express-validator');

const ApartmentModel = require("../Models/apartment.model");
const ParkingSpacesModel = require("../Models/parking.spaces.model");

const assignedParkingValidationForPost = [

    check('idApartment')
        .notEmpty().withMessage('El ID del apartamento es obligatorio.')
        .isInt().withMessage('El ID del apartamento es obligatorio.')
        .custom(async (value) => {
            if (value) {
                const apartment = await ApartmentModel.findOne({ where: { idApartment: value } });
                if (apartment) {
                    throw new Error(`El ID del apartamento "${value}" ya está en uso.`);
                }
            }
            return true;
        }),



    check('idParkingSpace')
        .notEmpty().withMessage('El ID del espacio de estacionamiento es obligatorio.')
        .isInt().withMessage('El ID del espacio de estacionamiento debe ser un número entero positivo.')
        .custom(async (value) => {
            const parkingSpace = await ParkingSpacesModel.findOne({ where: { idParkingSpace: value } });
            if (parkingSpace) {
                return true;
            }
            throw new Error(`El parqueadero no esta en el sistema`);

        }),

]


// const assignedParkingValidationForPut = [


//     // check('parkingName')
//     //     .optional()
//     //     .isLength({ min: 3 })
//     //     .withMessage('El nombre del espacio de estacionamiento debe tener al menos 3 caracteres.')
//     //     .matches(/^[a-zA-Z0-9\s]+$/)
//     //     .withMessage('El nombre del espacio de estacionamiento solo debe contener letras y números.')
//     //     .custom(async (value, { req }) => {

//     //         const body = req.body

//     //         const existingParkingById = await ParkingSpacesModel.findOne({ where: { idParkingSpace: body.idParkingSpace } });
//     //         const existingParkingByName = await ParkingSpacesModel.findOne({ where: { parkingName: value } });

//     //         if (!existingParkingById || !existingParkingByName) {
//     //             return true; // Permitir el registro
//     //         } else if (existingParkingById.parkingName !== existingParkingByName.parkingName) {
//     //             throw new Error(`Nombre del parqueadero "${value}" ya está en uso.`);
//     //         } else {
//     //             return true;
//     //         }



//     //     }),

//     // check('parkingType')
//     //     .isIn(['Private', 'Public'])
//     //     .withMessage('El tipo de espacio de estacionamiento no es válido.'),

//     // check('status')
//     //     .isIn(['Active', 'Inactive'])
//     //     .withMessage('El estado del espacio de estacionamiento no es válido.'),
// ];


module.exports = {

    assignedParkingValidationForPost,

}