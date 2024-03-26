const yup = require("yup");
const RecoveryCode = require('../Models/RecoveryCode.model');

const recoveryCodeSchema = yup.object().shape({
    recoveryCode: yup
        .string()
        .required('El código es requerido.')
        .test('code-exists', 'El código no es válido.', async (value) => {
            if (!value) {
                return true;
            }
            const recovery = await RecoveryCode.findAll({ where: { code: value } });
            return recovery.length > 0;
        }),
});

const recoveryCodeValidations = async (req, res, next) => {
    try {
        await recoveryCodeSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            const errors = error.inner.map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({ errors });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = { recoveryCodeValidations };

