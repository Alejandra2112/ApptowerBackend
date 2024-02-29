const { check, validationResult } = require('express-validator');
const SpacesModel = require('../Models/spaces.model');
const TowerModel = require('../Models/tower.model');


const towerValidationForPost = [


    check('towerName')
        .trim()
        .notEmpty()
        .withMessage('Nombre de torre es obligatorio')
        .isLength({ min: 3, max: 20 })
        .withMessage('El nombre del bloque debe tener maximo 20 caracteres.')
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage('El nombre de la torre solo puede contener letras, números y espacios')
        .custom(async (value) => {
            const existingSpace = await TowerModel.findOne({ where: { towerName: value } });

            if (existingSpace) {
                throw new Error('Nombre del bloque ya esta en uso.');
            }

            return true;
        }),


];
const towerValidationForPut = [

    check('towerName')
        .optional() // Hacer que el nombre de la torre sea opcional para las actualizaciones
        .trim()
        .notEmpty()
        .withMessage('Nombre de torre es obligatorio')
        .isLength({ min: 3, max: 20 })
        .withMessage('El nombre del bloque debe tener máximo 20 caracteres.')
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage('El nombre de la torre solo puede contener letras, números y espacios')
        // .custom(async (value, { req }) => {

        //     console.log(req.body.towerName, 'body')
        //     const existingTowerById = await TowerModel.findOne({ where: { idTower: req.body.idTower } });

        //     const existingTowerByName = await TowerModel.findOne({ where: { towerName: value } });

        //     if (req?.body?.towerName == existingTowerByName?.towerName) {

        //         return true;

        //     } else if (existingTowerByName) throw new Error('Nombre del bloque ya esta en uso.');

        //     return true;

        // }),

    .check('status')
        .isIn(['Active', 'Inactive'])
        .withMessage('El estado no es válido.')
];




module.exports = {

    towerValidationForPost,
    towerValidationForPut

}


// const yup = require('yup');
// const TowerModel = require('../Models/tower.model');

// async function checkIfTowerNameExists(value) {
//     const tower = await TowerModel.findOne({ where: { towerName: value } });
//     return tower !== null;
// }
// const towerSchemaForPost = yup.object().shape({
//     towerName: yup.string()
//         .required('Debes poner el nombre del bloque.')
//         .matches(/^[a-zA-Z0-9\s]+$/, 'El nombre de la torre solo puede contener letras, números y espacios')
//         .test('tower-name-available', 'Este nombre de torre ya está en uso', function (value) {
//             return new Promise((resolve, reject) => {
//                 checkIfTowerNameExists(value)
//                     .then(isAvailable => {
//                         if (isAvailable) {
//                             resolve(true); // El nombre de la torre está disponible
//                         } else {
//                             reject(new Error('Este nombre de torre ya está en uso'));
//                         }
//                     })
//                     .catch(error => {
//                         reject(error);
//                     });
//             });
//         }),
//     status: yup.string().default('Active')
// });

// const towerSchemaForPut = yup.object().shape({
//     towerName: yup.string()
//         .matches(/^[a-zA-Z0-9\s]+$/, 'El nombre de la torre solo puede contener letras, números y espacios')
//         .test('tower-name-available', 'Este nombre de torre ya está en uso', function (value) {
//             return new Promise((resolve, reject) => {
//                 checkIfTowerNameExists(value)
//                     .then(isAvailable => {
//                         if (isAvailable) {
//                             resolve(true); // El nombre de la torre está disponible
//                         } else {
//                             reject(new Error('Este nombre de torre ya está en uso'));
//                         }
//                     })
//                     .catch(error => {
//                         reject(error);
//                     });
//             });
//         }),
//     status: yup.string().oneOf(['Active', 'Inactive'])
// });



// function towerValidations(req, res, next) {
//     try {
//         let schema;
//         if (req.method === 'POST') {
//             schema = towerSchemaForPost;
//         } else if (req.method === 'PUT') {
//             schema = towerSchemaForPut;
//         } else {
//             return next();
//         }

//         schema.validateSync(req.body, { abortEarly: false });
//         next();
//     } catch (error) {
//         let errors;
//         if (error.inner) {
//             errors = error.inner.map(err => ({
//                 field: err.path,
//                 message: err.message
//             }));
//         } else {
//             errors = [{
//                 field: 'root',
//                 message: error.message
//             }];
//         }
//         res.status(400).json({ errors });
//     }
// }


// module.exports = {

//     towerValidations,

// }