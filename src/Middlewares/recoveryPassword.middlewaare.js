const yup = require("yup");
const UserModel = require('../Models/users.model');

const recoveryPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .email('El correo es inválido')
        .required('El correo es requerido.')
        .test('email-exists', 'El correo no esta registrado.', async (value) => {
            if (!value) {
                return true;
            }
            const users = await UserModel.findAll({ where: { email: value } });
            return users.length > 0;
        }),
});

const recoveryPasswordValidations = async (req, res, next) => {
    try {
        await recoveryPasswordSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errors = error.inner.map(err => ({
            field: err.path,
            message: err.message
        }));
        return res.status(400).json({ errors });
    }
}

module.exports = { recoveryPasswordValidations };
