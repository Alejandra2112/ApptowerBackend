const { check } = require('express-validator');

const Vehicle = require('../Models/vehicle.model');

const vehiclesValidationsForPost = [

    // check('idvehicle')
    //     .notEmpty().withMessage('El ID del vehiculo es obligatorio.')
    //     .isInt().withMessage('El ID del vehiculo debe ser un numero entero.')
    //     .custom(async (value) => {

    //         const existingVehicle = await Vehicle.findOne({ where: { idvehicle: value } });

    //         if (existingVehicle) {
    //             return true
    //         }
    //         else throw new Error('El vehiculo selecionado no esta en el sistema.');

    //     }),

    check('licenseplate')
        .notEmpty().withMessage('La placa del vehiculo es obligatoria.')
        .isLength({ min: 6, max: 6 }).withMessage('La placa debe ser de 6 caracteres.')
        .matches(/^[A-Z]{3}[0-9]{3}$|^[A-Z]{3}[0-9]{2}[A-Z]$/)
        .withMessage('La placa del vehículo debe tener un formato válido, como AAA123 o AAA12A.')
        .custom(async (value) => {

            const licenseExisting = await Vehicle.findOne({ where: { licenseplate: value } });

            if (licenseExisting) {
                throw new Error(`La placa del vehículo '${value}' ya existe en el sistema.`);
            }
            return true;
        }),


    check('description')
        .notEmpty().withMessage('La descripción es obligatoria.')
        .isString().withMessage('La descripción debe ser un texto.')
        .isLength({ min: 10, max: 255 }).withMessage('La descripcion debe tener entre 10 y 255 caracteres.')


]

const vehiclesValidationsForPut = [

    check('idvehicle')
        .optional()
        .isInt().withMessage('El ID del vehiculo debe ser un numero entero.')
        .custom(async (value) => {

            const existingVehicle = await Vehicle.findOne({ where: { idvehicle: value } });

            if (existingVehicle) {
                return true
            }
            else throw new Error('El vehiculo selecionado no esta en el sistema.');

        }),

    check('licenseplate')

        .optional()
        .isLength({ min: 6, max: 6 }).withMessage('La placa debe ser de 6 caracteres.')
        .matches(/^[A-Z]{3}[0-9]{3}$|^[A-Z]{3}[0-9]{2}[A-Z]$/)
        .withMessage('La placa del vehículo debe tener un formato válido, como AAA123 o AAA12A.')
        .custom(async (value) => {

            const licenseExisting = await Vehicle.findOne({ where: { licenseplate: value } });

            if (licenseExisting) {
                throw new Error(`La placa del vehículo '${value}' ya existe en el sistema.`);
            }
            return true;
        }),


    check('description')
        .optional()
        .isString().withMessage('La descripción debe ser un texto.')

]

module.exports = {

    vehiclesValidationsForPost,
    vehiclesValidationsForPut

}