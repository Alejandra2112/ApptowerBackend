const yup = require("yup");

const postEnterpriceSchema = yup.object().shape({

    nameEnterprice: yup.string().required("El nombre es requerido.")
        .min(3, 'Debe tener minimo 3 caracteres.')
        .max(25, 'Solo puede tener maximo 25 caracteres.'),

    NIT: yup.string().required("El NIT es requerido.")
        .min(9, 'Debe tener minimo 9 numeros.')
        .max(13, 'Solo puede tener maximo 13 numeros-')
        .test('Is positive number?', 'El NIT debe ser un número.', (value) => /^[0-9]+$/.test(value)),

    address: yup.string().required("La dirección es requerida.")
        .min(5, 'Debe tener minimo 5 caracteres.')
        .max(20, 'Solo puede tener maximo 20 caracteres.'),

    phone: yup.string().required("El teléfono es requerido.")
        .min(10, 'Debe tener minimo 10 caracteres.')
        .max(10, 'Solo puede tener maximo 10 caracteres.')
        .test('Is positive number?', 'El teléfono debe ser un número.', (value) => /^[0-9]+$/.test(value)),

    email: yup.string().email().required("El correo es requerido."),

});


const putEnterpriceSchema = yup.object().shape({

    nameEnterprice: yup.string().min(3, 'Debe tener minimo 3 caracteres')
        .max(25, 'Solo puede tener maximo 25 caracteres'),

    NIT: yup.string().min(9, 'Debe tener minimo 9 numeros')
        .max(13, 'Solo puede tener maximo 13 numeros')
        .test('Is positive number?', 'El NIT debe ser un número.', (value) => /^[0-9]+$/.test(value)),

    address: yup.string().min(10, 'Debe tener minimo 10 caracteres')
        .max(20, 'Solo puede tener maximo 20 caracteres'),

    phone: yup.string().min(10, 'Debe tener minimo 10 caracteres')
        .max(10, 'Solo puede tener maximo 10 numeros.')
        .test('Is positive number?', 'El teléfono debe ser un número.', (value) => /^[0-9]+$/.test(value)),

    email: yup.string().email().required("El correo es requerido"),

    state: yup.string().matches(/^(Activo|Inactivo)$/, 'Estado invalido'),

});


const enterpriceValidations = (req, res, next) => {
    try {
        let schema;
        if (req.method === 'POST') {
            schema = postEnterpriceSchema;
        } else if (req.method === 'PUT') {
            schema = putEnterpriceSchema;
        } else {
            return next();
        }
        schema.validateSync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errors = error.inner.map(err => ({
            field: err.path,
            message: err.message
        }));
        res.status(400).json({ errors });
    }
}


module.exports = {
    enterpriceValidations,
}