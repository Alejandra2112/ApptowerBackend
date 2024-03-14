const { check, validationResult } = require('express-validator');

const ResidentModel = require('../Models/resident.model');
const ApartmentResidentModel = require('../Models/apartment.residents.model');

const residentsTypes = [

    {
        value: "owner",
        label: "Propietario"
    },

    {
        value: "tenant",
        label: "Arrendatario"
    }
]   


const residentTypeValidation = [

    check('residentType')
        // .notEmpty().withMessage('El tipo de residente es obligatorio.')
        // .isIn(residentsTypes.map(type => type.value)).withMessage('El tipo de residente no es válido.')
        
];

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
            const resident = await ResidentModel.findByPk(apartmentresidents[0].idResident)

            if (apartmentresidents && apartmentresidents.length > 0 && resident.status == 'Active') {

                throw new Error('El residente esta activos en un apartamento.');
            }
            return true

        })

]

module.exports = {

    residentStatusValidation,
    residentTypeValidation

}
