const { validationResult, check } = require('express-validator');
const Permission = require('../Models/permissions.model');
const Privilege = require('../Models/privileges.model');

const validateRols = [
  check('namerole').isString().withMessage('El campo "namerole" debe ser una cadena'),

  async (req, res, next) => {
    const { namerole, detailsRols } = req.body;

    if (!detailsRols || detailsRols.length === 0) {
      return res.status(400).json({
        error: 'Debes proporcionar al menos un detalle de rol',
      });
    }

    try {
      const permissions = detailsRols.map((detail) => detail.permiso);
      const privileges = detailsRols.map((detail) => detail.privilege);

      const existingPermissions = await Permission.findAll({
        where: {
          permission: permissions,
        },
        attributes: ['idpermission'],
      });

      const existingPrivileges = await Privilege.findAll({
        where: {
          privilege: privileges,
        },
        attributes: ['idprivilege'],
      });

      if (existingPermissions.length !== detailsRols.length || existingPrivileges.length !== detailsRols.length) {
        return res.status(400).json({
          error: 'Algunos de los permisos o privilegios proporcionados no existen en la base de datos.',
        });
      }

      next();
    } catch (error) {
      console.error('Error al validar permisos y privilegios:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
];

module.exports = validateRols;
