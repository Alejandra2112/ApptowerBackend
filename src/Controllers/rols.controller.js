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
  const { namerole, description, detailsRols } = req.body;

  try {
    if (!detailsRols || !Array.isArray(detailsRols)) {
      return res.status(400).json({
        error: "Invalid detailsRols",
      });
    }

    const rols = await Rols.create({ namerole, description });

    const detailInstances = await Promise.all(detailsRols.map(async (detail) => {
      const permission = await Permission.findOne({ where: { permission: detail.permiso } });
      const privilege = await Privileges.findOne({ where: { privilege: detail.privilege } });

      console.log('permission:', permission);
      console.log('privilege:', privilege);

      return {
        idrole: rols.idrole,
        idpermission: permission ? permission.idpermission : null,
        idprivilege: privilege ? privilege.idprivilege : null,
      };
    }));

    await rolsPermissions.bulkCreate(detailInstances);
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


const putRols = async (req, res) => {
  const { idrole, permissions, privileges } = req.body;

  try {
    const existingRole = await Rols.findByPk(idrole);
    if (!existingRole) {
      return res.status(404).json({ error: 'No se encontró un rol con ese ID' });
    }

    await rolsPermissions.destroy({ where: { idrole } });

    if (permissions && Array.isArray(permissions) && privileges && Array.isArray(privileges)) {

      const permissionPrivilegeAsso = permissions.map((permissionId) =>

        privileges.map((privilegeId) => ({
          idrole,
          idpermission: permissionId,
          idprivilege: privilegeId,
        }))
      );
      const iteratedAsso = [].concat(...permissionPrivilegeAsso);

      await rolsPermissions.bulkCreate(iteratedAsso);
    }

    return res.json({ message: 'Rol actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
};






// const deleteRols = async (req, res) => {
//   const { idrole } = req.body;
//   let message = '';
//   try {
//     const rowsDeleted = await Rols.destroy({ where: { idrole: idrole } });

//     if (rowsDeleted > 0) {
//       message = 'Rol eliminado exitosamente';
//     } else {
//       res.status(404).json({ error: 'No se encontró un rol con ese ID' });
//     }
//   } catch (e) {
//     res.status(500).json({ error: 'Error al eliminar rol', message: e.message });
//   }
//   res.json({
//     rols: message,
//   });
// };


module.exports = {
  getRols,
  postRols,
  putRols,
  getRolsOne
};
