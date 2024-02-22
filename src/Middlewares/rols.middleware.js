const yup = require("yup");

const postRolSchema = yup.object().shape({

  namerole: yup.string().required("El nombre del rol es requerido")
    .min(3, 'Debe tener minimo 3 caracteres')
    .max(28, 'Solo puede tener maximo 50 caracteres'),

  description: yup.string().required("La descripción es requerida")
    .min(3, 'Debe tener minimo 3 caracteres')
    .max(30, 'Solo puede tener maximo 50 caracteres'),

});

const putRolSchema = yup.object().shape({

  namerole: yup.string().min(3, 'Debe tener minimo 3 caracteres')
    .max(28, 'Solo puede tener maximo 50 caracteres'),

  description: yup.string().min(3, 'Debe tener minimo 3 caracteres')
    .max(30, 'Solo puede tener maximo 50 caracteres'),

  state: yup.string().matches(/^(Activo|Inactivo)$/, 'Estado invalido'),
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
