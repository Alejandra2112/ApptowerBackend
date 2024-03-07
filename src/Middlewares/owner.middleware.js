const { check } = require('express-validator');
const OwnersModel = require('../Models/owners.model');
const ApartmentOwnerModel = require('../Models/apartment.owners.model');
const ResidentModel = require('../Models/resident.model');
const ApartmentResidentModel = require('../Models/apartment.residents.model');



const ownerStatusValidation = [

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

        .custom(async (value) => {

            const apartmentOwners = await ApartmentOwnerModel.findAll({ where: { idOwner: value, status: 'Active' } });

            if (apartmentOwners && apartmentOwners.length > 0) {

                throw new Error('El propietario tiene propiedades activas.');
            }
            return true

        })

]



module.exports = {

    ownerStatusValidation,

}