const { validationResult, check } = require('express-validator');
const Permission = require('../Models/permissions.model');
const Privilege = require('../Models/privileges.model');

const validateRols = [
  check('namerole')
    .isString()
    .withMessage('El campo "namerole" debe ser una cadena'),

  check('permissions')
    .isArray({ min: 1 })
    .withMessage('Debes proporcionar al menos un permiso'),

  check('privileges')
    .isArray({ min: 1 })
    .withMessage('Debes proporcionar al menos un privilegio'),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { permissions, privileges } = req.body;

    try {

      const validPermissions = await Promise.all(
        permissions.map(async (permissionId) => {
          const permission = await Permission.findByPk(permissionId);
          return permission !== null;
        })
      );

      const validPrivileges = await Promise.all(
        privileges.map(async (privilegeId) => {
          const privilege = await Privilege.findByPk(privilegeId);
          return privilege !== null;
        })
      );

      if (validPermissions.includes(false) || validPrivileges.includes(false)) {
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

