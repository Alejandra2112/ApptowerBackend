const { response } = require('express');
const Rols = require('../Models/rols');
const Permission = require('../Models/permissions');
const rolsPermissions = require('../Models/rols_permissions');

const getRolPermissions = async (req, res = response) => {
  try {

    // const Rols = await Rols.findAll();

    // const permisos = await Permiso.findAll();

    const rolPermission = await rolsPermissions.findAll();
    console.log('datos de rolpermiso obtenidos correctamente:', rolPermission );

    res.json({
      rolPermission
    });
  } catch (error) {

    console.error(error);

    res.status(500).send('Error al cargar datos permisos.');
  }
};

const postRolPermissions = async (req, res) => {
  let mensaje = '';
  const { idrol, idpermission } = req.body;

  try {
    // Verifica que los ambos id sean válidos y existan
    const rol = await Rols.findByPk(idrol);
    const permission = await Permission.findByPk(idpermission);

    if (!rol || !permission) {
      mensaje = 'Rol o permiso no válido.';
    } else {
      await rolsPermissions.create({ idrol, idpermission });
      mensaje = 'Permiso asignado exitosamente.';
    }
  } catch (error) {
    mensaje = 'Error al asignar permiso a rol.';
    console.error(error);
  }

  res.json({
    rolPermission: mensaje,
  });
};


module.exports = {
  getRolPermissions,
  postRolPermissions
}
