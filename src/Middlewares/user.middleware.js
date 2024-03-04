const yup = require("yup");

const postUserSchema = yup.object().shape({

    docType: yup.string().required("El tipo de documento es requerido")
        .length(2).matches(/^(CC|CE|PA)$/, 'Tipo de documento invalido'),

    document: yup.string().required("El documento es requerido").min(8, 'El documento debe tener minimo 8 numeros')
        .max(13, "El documento solo puede tener maximo 13 numeros"),

    name: yup.string().required("El nombre es requerido"),
    // .matches(/^[a-zA-Z0-9\s]*$/, 'No se permiten caracteres especiales'),

    lastName: yup.string().required("El apellido es requerido"),
    // .matches(/^[a-zA-Z0-9\s]*$/, 'No se permiten caracteres especiales'),

    idrole: yup.number().required("El rol es requerido"),

    password: yup.string().required("La contraseña es requerida")
        .min(8, 'Debe tener minimo 8 caracteres')
        .max(12, 'Solo puede tener maximo 12 caracteres'),

    email: yup.string().email().required("El correo es requerido"),

    phone: yup.string().min(10, 'El teléfono debe tener minimo 10 numeros').matches(/^[0-9]*$/, 'Solo se permiten números').max(10, 'El teléfono solo puede tener maximo 10 numeros')
        .required("El teléfono es requerido"),

    birthday: yup.date().required("La fecha de nacimiento es requerida"),

    sex: yup.string().matches(/^(M|F|O|No proporcionado)$/, 'Sexo invalido'),

});


const putUserSchema = yup.object().shape({

    docType: yup.string().required("El tipo de documento es requerido")
        .length(2).matches(/^(CC|CE|PA)$/, 'Tipo de documento invalido'),

    document: yup.string().required("El documento es requerido").min(8, 'El documento debe tener minimo 8 numeros')
        .max(13, "El documento solo puede tener maximo 13 numeros"),

    name: yup.string().required("El nombre es requerido"),
    // .matches(/^[a-zA-Z0-9\s]*$/, 'No se permiten caracteres especiales'),

    lastName: yup.string().required("El apellido es requerido"),
    // .matches(/^[a-zA-Z0-9\s]*$/, 'No se permiten caracteres especiales'),

    idrole: yup.number().required("El rol es requerido"),

    email: yup.string().email().required("El correo es requerido"),

    phone: yup.string().min(10, 'El teléfono debe tener minimo 10 numeros').matches(/^[0-9]*$/, 'Solo se permiten números').max(10, 'El teléfono solo puede tener maximo 10 numeros')
        .required("El teléfono es requerido"),

    birthday: yup.date().required("La fecha de nacimiento es requerida"),

    sex: yup.string().matches(/^(M|F|O|No proporcionado)$/, 'Sexo invalido'),

    state: yup.string().matches(/^(Activo|Inactivo)$/, 'Estado invalido'),

});


const UserValidationes = (req, res, next) => {
    try {
        let schema;
        if (req.method === 'POST') {
            schema = postUserSchema;
        } else if (req.method === 'PUT') {
            schema = putUserSchema;
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
    UserValidationes,
}


