const { response } = require('express');
const Roles = require('../Models/roles');
const Permiso = require('../Models/permisos');
const RolPermiso = require('../Models/rol_permiso');

const getPermisoRol = async (req, res = response) => {
  try {
    
    // const roles = await Roles.findAll();

    // const permisos = await Permiso.findAll();

    const permisoRol = await RolPermiso.findAll();
    console.log('datos de rolpermiso obtenidos correctamente:', permisoRol );



    res.json({
      permisoRol
    });
  } catch (error) {

    console.error(error);

    res.status(500).send('Error al cargar datos permisos.');
  }
};

const postPermisoRol = async (req, res) => {
  let mensaje = '';
  const { idrol, idpermiso } = req.query;

  try {
    // Verifica que los ambos id sean válidos y existan
    const rol = await Roles.findByPk(idrol);
    const permiso = await Permiso.findByPk(idpermiso);

    if (!rol || !permiso) {
      mensaje = 'Rol o permiso no válido.';
    } else {
      await RolPermiso.create({ idrol, idpermiso });
      mensaje = 'Permiso asignado exitosamente.';
    }
  } catch (error) {
    mensaje = 'Error al asignar permiso a rol.';
    console.error(error);
  }

  res.json({
    permisorol: mensaje,
  });
};


module.exports = {
  getPermisoRol,
  postPermisoRol
}
