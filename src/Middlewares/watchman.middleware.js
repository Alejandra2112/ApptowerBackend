const yup = require("yup");

const postWatchmanSchema = yup.object().shape({

  idEnterpriseSecurity: yup.number().required("La empresa de seguridad es requerida"),

  iduser: yup.number().required("El usuario es requerido"),


});


const putWatchmanSchema = yup.object().shape({

  idEnterpriseSecurity: yup.number(),

  iduser: yup.number(),

  state: yup.string().matches(/^(Activo|Inactivo)$/, 'Estado invalido'),

});


const watchmanValidations = (req, res, next) => {
  try {
    let schema;
    if (req.method === 'POST') {
      schema = postWatchmanSchema;
    } else if (req.method === 'PUT') {
      schema = putWatchmanSchema;
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
  watchmanValidations,
}