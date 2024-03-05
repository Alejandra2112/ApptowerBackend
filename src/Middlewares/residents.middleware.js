const { check } = require('express-validator');

const ResidentModel = require('../Models/resident.model');
const ApartmentResidentModel = require('../Models/apartment.residents.model');

const residentStatusValidation = [

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

        .custom(async (value) => {

            const apartmentresidents = await ApartmentResidentModel.findAll({ where: { idResident: value, status: 'Active' } });

            if (apartmentresidents && apartmentresidents.length > 0) {

                throw new Error('El residente esta activos en un apartamento.');
            }
            return true

        })

]

module.exports = {

    residentStatusValidation,

}