const { check } = require('express-validator');

const TowerModel = require('../Models/tower.model');
const ApartmentModel = require('../Models/apartment.model');

const apartmentValidationForPost = [

    // check('idApartment')
    //     .notEmpty().withMessage('El ID del apartamento es obligatorio.')
    //     .isInt().withMessage('El ID del apartamento debe ser un número entero positivo.'),

    check('idTower')
        .notEmpty().withMessage('El ID de la torre es obligatorio.')
        .isInt().withMessage('El ID de la torre debe ser un número entero positivo.')
        .custom(async (value) => {
            const tower = await TowerModel.findOne({ where: { idTower: value } });
            if (tower) {
                return true;
            }
            throw new Error(`El bloque selecionado no esta en el sistema`);

        }),

    check('apartmentName')
        .notEmpty().withMessage('El nombre del apartamento es obligatorio.')
        .isLength({ max: 20 }).withMessage('El nombre del apartamento no puede exceder los 20 caracteres.')
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage('Nombre del apartamento solo debe tener numeros y letras.')
        .custom(async (value) => {
            const apartment = await ApartmentModel.findOne({ where: { apartmentName: value } });
            if (apartment) {
                throw new Error(`Nombre del apartamento "${value}" ya está en uso.`);
            }
            return true;
        }),

    check('area')
        .notEmpty().withMessage('El área del apartamento es obligatoria.')
        .isNumeric().withMessage('El área del apartamento debe ser un número.')
        .isFloat({ min: 0 }).withMessage('El área del apartamento debe ser un número mayor o igual a cero.')



    // check('idParkingSpace')
    //     .notEmpty().withMessage('El ID del espacio de estacionamiento es obligatorio.')
    //     .isInt().withMessage('El ID del espacio de estacionamiento debe ser un número entero positivo.')
    //     .custom(async (value) => {
    //         const parkingSpace = await ParkingSpacesModel.findOne({ where: { idParkingSpace: value } });
    //         if (parkingSpace) {
    //             return true;
    //         }
    //         throw new Error(`El parqueadero no esta en el sistema`);

    //     }),

]



module.exports = {

    apartmentValidationForPost,

}