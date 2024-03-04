const yup = require("yup");

const postRolSchema = yup.object().shape({

  namerole: yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'El nombre del rol solo puede contener letras y espacios.')
    .required("El nombre del rol es requerido")
    .min(3, 'El nombre de rol debe tener minimo 3 caracteres.')
    .max(20, 'El nombre de rol puede tener maximo 20 caracteres.'),

  description: yup.string().required("La descripción es requerida.")
    .min(3, 'La descripción debe tener minimo 3 caracteres.')
    .max(30, 'La descripción puede tener maximo 30 caracteres.'),

  detailsRols: yup.array()
    .of(yup.object().shape({
      permiso: yup.string().required('El permiso es requerido'),
      privilege: yup.string().required('El privilegio es requerido'),
    }))
    .required('Los detalles de los roles son requeridos')
    .min(1, 'Debes proporcionar al menos un permiso'),
});


const putRolSchema = yup.object().shape({

  namerole: yup.string().min(3, 'El nombre de rol debe tener minimo 3 caracteres.')
    .max(20, 'El nombre de rol puede tener maximo 20 caracteres.')
    .matches(/^[a-zA-Z\s]+$/, 'El nombre del rol solo puede contener letras y espacios.'),

  description: yup.string().min(3, 'La descripción debe tener minimo 3 caracteres.')
    .max(30, 'La descripción puede tener maximo 30 caracteres.'),

  state: yup.string().matches(/^(Activo|Inactivo)$/, 'Estado invalido'),

  detailsRols: yup.array()
    .of(yup.object().shape({
      permiso: yup.string().required('El permiso es requerido'),
      privilege: yup.string().required('El privilegio es requerido'),
    }))
    .required('Los detalles de los roles son requeridos')
    .min(1, 'Debes proporcionar al menos un permiso'),
});

const rolValidations = (req, res, next) => {
  try {
    let schema;
    if (req.method === 'POST') {
      schema = postRolSchema;
    } else if (req.method === 'PUT') {
      schema = putRolSchema;
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
  rolValidations,
}
