const { check, validationResult } = require('express-validator');
const SpacesModel = require('../Models/spaces.model');
const TowerModel = require('../Models/tower.model');


const towerValidationForPost = [


    check('towerName')
        .notEmpty()
        .withMessage('Nombre de torre es obligatorio')
        .isLength({ min: 1, max: 20 })
        .withMessage('El nombre del bloque debe tener maximo 20 caracteres.')
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage('El nombre de la torre solo puede contener letras, números y espacios')
        .custom(async (value) => {
            const existingSpace = await TowerModel.findOne({ where: { towerName: value } });

            if (existingSpace) {
                throw new Error(`Nombre del bloque "${value}" ya está en uso.`);
            }

            return true;
        }),


];
const towerValidationForPut = [

    check('towerName')
        .optional()
        .isLength({ min: 1, max: 20 })
        .withMessage('El nombre del bloque debe tener máximo 20 caracteres.')
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage('El nombre de la torre solo puede contener letras, números y espacios')
        .custom(async (value, { req }) => {

            const body = req.body

            console.log(body, 'body')
            const existingTowerById = await TowerModel.findOne({ where: { idTower: body.idTower } });
            const existingTowerByName = await TowerModel.findOne({ where: { towerName: value } });

            if (!existingTowerById || !existingTowerByName) {
                return true; // Permitir el registro
            } else if (existingTowerById.towerName !== existingTowerByName.towerName) {
                throw new Error(`Nombre del bloque "${value}" ya está en uso.`);
            } else {
                return true;
            }



        }),

    check('status')
        .isIn(['Active', 'Inactive'])
        .withMessage('El estado no es válido.')
];




module.exports = {

    towerValidationForPost,
    towerValidationForPut

}

