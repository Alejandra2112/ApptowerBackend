const { check } = require('express-validator');
const OwnersModel = require('../Models/owners.model');
const ApartmentOwnerModel = require('../Models/apartment.owners.model');
const ResidentModel = require('../Models/resident.model');
const ApartmentResidentModel = require('../Models/apartment.residents.model');

const createAapartmentOwnerValidationforPost = [

    check('idApartment')
        .custom(async (value, { req }) => {

            const existingRecord = await ApartmentOwnerModel.findOne({
                where: { idApartment: value, status: 'Active' }
            });

            if (existingRecord) {
                throw new Error('Este apartamento ya tiene un propietario activo.');
            } else {
                return true;
            }
        }),
]

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

            const owner = await OwnersModel.findByPk(apartmentOwners[0].idOwner)

            console.log(owner, 'my owner')
            if (apartmentOwners && apartmentOwners.length > 0 && owner.status == 'Active') {

                throw new Error('El propietario tiene propiedades activas.');
            }
            return true

        })

]



module.exports = {

    ownerStatusValidation,
    createAapartmentOwnerValidationforPost,
}