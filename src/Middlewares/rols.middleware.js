const { validationResult, check } = require('express-validator');

const validateRols = [
  check('namerole').isString().withMessage('El campo "namerole" debe ser una cadena'),

  async (req, res, next) => {
    const { namerole, detailsRols } = req.body;

    if (!detailsRols || detailsRols.length === 0) {
      return res.status(400).json({
        error: 'Debes proporcionar al menos un detalle de rol',
      });
    }

    next();
  },
];

module.exports = validateRols;
