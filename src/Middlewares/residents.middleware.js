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

        .custom(async (value, { req }) => {

            try {

                const apartmentResident = await ApartmentResidentModel.findAll({ where: { idResident: value, status: 'Active' } });
                const owner = await ResidentModel.findByPk(value);

                // const resident = await ResidentModel.findOne({ where: { iduser: owner.iduser } });;
                // let apartmentResident;

                // if (resident ) {

                //     apartmentResident = await ApartmentResidentModel.findAll({ where: { idResident: resident.idResident, status: 'Active' } });
                //     if (apartmentResident && apartmentResident.length > 0) {
                //         throw new Error('El residente tiene residencia activas.');
                //     }
                // }

                if (apartmentResident && apartmentResident.length > 0 || req.status == 'Inactive') {
                    throw new Error('El residente tiene residencias activas.');
                }

                return true;
            } catch (error) {
                console.error('Error en la validación:', error.message);
                throw error; // Re-lanzamos el error para que sea capturado por el manejo de errores del validador
            }

        })

]

module.exports = {

    residentStatusValidation,
    residentTypeValidation

}
