const { response } = require('express');
const Rols = require('../Models/rols.model');
const Permission = require('../Models/permissions.model');
const rolsPermissions = require('../Models/rolsPermissions.model');

const getRols = async (req, res = response) => {
  try {
    const rols = await Rols.findAll({
      include: [
        {
          model: Permission,
          attributes: ['idpermission', 'permission'],
        },
      ],
    });
    console.log('roles obtenidos correctamente:', rols);
    res.json({
      rols,
    });
  } catch (error) {
    console.error('Error al obtener roles:', error);

    res.status(500).json({
      error: 'Error al obtener roles',
    });
  }
};


const postRols = async (req, res) => {
  let message = '';
  const { namerole, description, permission } = req.body;

  try {
    if (!permission || !Array.isArray(permission)) {
      return res.status(400).json({
        error: "Invalid permissions",
      });
    }

    const rols = await Rols.create({ namerole, description });

  
    const roleId = rols.idrole;

    const selectedPermissions = permission.map((idpermission) => {
      return {
        idrole: roleId, 
        idpermission,
      };
    });

    await rolsPermissions.bulkCreate(selectedPermissions);

    message = 'Rol registrado correctamente';
    res.json({
      rols: message
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



const putRols = async (req, res = response) => {
  try {
    const { idrole, ...update } = req.body;
    let message = '';

    const [updatedRows] = await Rols.update(update, { where: { idrole: idrole } });
    const permission = req.body.permissions;

    if (permission && Array.isArray(permission)) {
      const currentpermission = await rolsPermissions.findAll({ where: { idrole: idrole } });
      const currentIds = currentpermission.map((p) => p.idpermission);
      const requestedPer = permission;

      const toAdd = requestedPer.filter((idpermission) => !currentIds.includes(idpermission));
      const toRemove = currentIds.filter((idpermission) => !requestedPer.includes(idpermission));

      if (toAdd.length > 0) {
        await rolsPermissions.bulkCreate(toAdd.map((idpermission) => ({ idrole: idrole, idpermission: idpermission })));
      }

      if (toRemove.length > 0) {
        await rolsPermissions.destroy({ where: { idrole: idrole, idpermission: toRemove } });
      }
    }

    if (updatedRows > 0) {
      message = 'Rol actualizado exitosamente.';
    } else {
      message = 'No se encontró un rol con ese ID';
    }

    res.json({
      rols: message,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al modificar rol: ' + error.message,
    });
  }
};


const deleteRols = async (req, res) => {
  const { idrole } = req.body;
  let message = '';
  try {
    const rowsDeleted = await Rols.destroy({ where: { idrole: idrole } });

    if (rowsDeleted > 0) {
      message = 'Rol eliminado exitosamente';
    } else {
      res.status(404).json({ error: 'No se encontró un rol con ese ID' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Error al eliminar rol', message: e.message });
  }
  res.json({
    rols: message,
  });
};


module.exports = {
  getRols,
  postRols,
  putRols,
  deleteRols
};
