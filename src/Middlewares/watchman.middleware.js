const { check, validationResult } = require('express-validator');

const watchmanValidationForPost = [
  check('idEnterpriseSecurity').isNumeric().withMessage('El rol es requerido.'),

  check('iduser').isNumeric().withMessage('El rol es requerido.'),

];

const watchmanValidationForPut = [
  check('idEnterpriseSecurity').isNumeric().withMessage('El rol es requerido.'),

  check('iduser').isNumeric().withMessage('El rol es requerido.'),

  check('state').isIn(['Activo', 'Inactivo']).withMessage('Estado inválido.'),

];

const watchmanValidations = (req, res, next) => {
  let checks;
  if (req.method === 'POST') {
    checks = watchmanValidationForPost;
  } else if (req.method === 'PUT') {
    checks = watchmanValidationForPut;
  } else {
    return next();
  }
  Promise.all(checks.map(check => check.run(req)))
    .then(() => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    })
    .catch(next);
};

module.exports = { watchmanValidations };