const yup = require("yup");

const postEnterpriceSchema = yup.object().shape({

    nameEnterprice: yup.string().required("El nombre es requerido")
        .min(3, 'Debe tener minimo 3 caracteres')
        .max(28, 'Solo puede tener maximo 50 caracteres'),

    NIT: yup.string().required("El nit es requerido")
        .min(9, 'Debe tener minimo 9 caracteres')
        .max(13, 'Solo puede tener maximo 13 caracteres'),

    address: yup.string().required("La dirección es requerida")
        .min(5, 'Debe tener minimo 5 caracteres')
        .max(20, 'Solo puede tener maximo 20 caracteres'),

    phone: yup.string().required("El telefono es requerido")
        .min(10, 'Debe tener minimo 10 caracteres')
        .max(10, 'Solo puede tener maximo 10 caracteres'),

    email: yup.string().email().required("El correo es requerido"),

});


const putEnterpriceSchema = yup.object().shape({

    nameEnterprice: yup.string().min(3, 'Debe tener minimo 3 caracteres')
        .max(28, 'Solo puede tener maximo 50 caracteres'),

    NIT: yup.string().min(9, 'Debe tener minimo 9 caracteres')
        .max(13, 'Solo puede tener maximo 13 caracteres'),

    address: yup.string().min(10, 'Debe tener minimo 10 caracteres')
        .max(20, 'Solo puede tener maximo 50 caracteres'),

    phone: yup.string().min(10, 'Debe tener minimo 10 caracteres')
        .max(10, 'Solo puede tener maximo 10 caracteres'),

    email: yup.string().email(),

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