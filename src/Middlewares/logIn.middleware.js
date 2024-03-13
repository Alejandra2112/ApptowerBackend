const { check, validationResult } = require('express-validator');
const UserModel = require('../Models/users.model');
const bcryptjs = require('bcryptjs')

const logInValidations = [
    check('usuario').notEmpty().withMessage('El correo es requerido.')
        .isEmail().withMessage('Ingrese un correo electrónico válido')

        .custom(async (usuario) => {
            const user = await UserModel.findOne({ where: { email: usuario } });
            if (!user) {
                return Promise.reject('Usuario incorrecto');
            }
        }),

    check('password')
        .notEmpty().withMessage('La contraseña es requerida.')
        .isLength({ min: 8, max: 15 })
        .withMessage('Ingrese contraseña 8-15 caracteres')
        .custom(async (password, { req }) => {
            const user = await UserModel.findOne({ where: { email: req.body.usuario } });
            if (user) {
                const isPasswordCorrect = await bcryptjs.compare(password, user.password);
                if (!isPasswordCorrect) {
                    return Promise.reject('Contraseña incorrecta');
                }
            }
        })
]

module.exports = {
    logInValidations,

}