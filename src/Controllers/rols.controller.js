const { response } = require('express');
const Rols = require('../Models/rols.model');
const Permission = require('../Models/permissions.model');
const rolsPermissions = require('../Models/rolsPermissions.model');
const Privileges = require('../Models/privileges.model');

const getRols = async (req, res = response) => {
  try {
    const rols = await Rols.findAll({
      include: [
        {
          model: rolsPermissions,
          attributes: ['idrolpermission', 'idrole', 'idpermission', 'idprivilege'],
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


const getRolsOne = async (req, res = response) => {
  try {
    const { idrole } = req.params;

    const rols = await Rols.findOne({
      where: { idrole: idrole },
      include: [
        {
          model: rolsPermissions,
          attributes: ['idrolpermission', 'idrole', 'idpermission', 'idprivilege'],
        },
      ],
    });

    if (!rols) {
      return res.status(404).json({ error: 'No se encontró un rol con ese ID' });
    }

    res.json({
      rols,
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      error: 'Error al obtener usuario',
    });
  }
};



const postRols = async (req, res) => {
  let message = '';
  const { namerole, description, permissions, privileges } = req.body;

  try {
    if (!permissions || !Array.isArray(permissions)) {
      return res.status(400).json({
        error: "Invalid permissions",
      });
    }

    if (!privileges || !Array.isArray(privileges)) {
      return res.status(400).json({
        error: "Invalid privileges",
      });
    }

    const rols = await Rols.create({ namerole, description });
    const roleId = rols.idrole;

    console.log('Created Rol:', rols);

    const selectedPermissions = permissions.map((permissionId) =>
      privileges.map((privilegeId) => ({
        idrole: roleId,
        idpermission: permissionId,
        idprivilege: privilegeId,
      }))
    );
    const iteratedpermissions = [].concat(...selectedPermissions);

    await rolsPermissions.bulkCreate(iteratedpermissions);

    message = 'Rol registrado correctamente';
    res.json({
      rols: message,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: error.message,
    });
  }
};


const putRols = async (req, res = response) => {
  try {
    const { idrole, permissions } = req.body;
    let message = '';

    const [updatedRows] = await Rols.update(req.body, { where: { idrole: idrole } });

    if (permissions && Array.isArray(permissions)) {
      // Obtén los permisos actuales asociados a este rol
      const currentPermissions = await rolsPermissions.findAll({ where: { idrole: idrole } });
      const currentPermissionIds = currentPermissions.map((p) => p.idpermission);

      // Identifica los permisos a agregar y quitar
      const permissionsToAdd = permissions.filter((idpermission) => !currentPermissionIds.includes(idpermission));
      const permissionsToRemove = currentPermissionIds.filter((idpermission) => !permissions.includes(idpermission));

      // Procesa los permisos a agregar
      if (permissionsToAdd.length > 0) {
        for (const idpermission of permissionsToAdd) {
          // Aquí, debes obtener el idprivilege correspondiente de tu lógica de negocios
          const idprivilege = obtenerIdPrivilege(idpermission); // Reemplaza 'obtenerIdPrivilege' con tu lógica real
          if (idprivilege !== null) {
            await rolsPermissions.create({
              idrole: idrole,
              idpermission: idpermission,
              idprivilege: idprivilege,
            });
          }
        }
      }

      // Procesa los permisos a quitar
      if (permissionsToRemove.length > 0) {
        await rolsPermissions.destroy({ where: { idrole: idrole, idpermission: permissionsToRemove } });
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
  deleteRols,
  getRolsOne
};
