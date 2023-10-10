const { response } = require('express');
const Roles = require('../Models/roles');


const getRoles = async (req, res = response) => {
    try {
      const roles = await Roles.findAll();

      console.log('roles obtenidos correctamente:', roles);
  
      res.json({
        roles,
      });
    } catch (error) {

      console.error('Error al obtener roles:', error);
  
      res.status(500).json({
        error: 'Error al obtener roles',
      });
    }  
};


const postRoles = async (req, res) => {
  let mensaje = '';
  const body = req.query; 
  try {
    await Roles.create(body); 
    mensaje = 'Rol Registrado Exitosamente';
  } catch (e) {
    mensaje = e.message;
  }
  res.json({
    roles: mensaje,
  });
};


const putRoles = async (req, res = response) => {
  const body = req.query;
  let mensaje = '';

  try {
    const { idrol, ...actualizacion } = body;

    const [updatedRows] = await Roles.update(actualizacion, {
      where: { idrol: idrol },
    });

    if (updatedRows > 0) {
      mensaje = 'Rol modificado exitosamente.';
    } else {
      mensaje = 'No se encontró un rol con ese ID';
    }
  } catch (error) {
    mensaje = 'Error al modificar rol: ' + error.message;
  }
  res.json({
    roles: mensaje,
  });
};


const deleteRoles = async (req, res) => {
  const { idrol } = req.query;
  let mensaje = '';
  try {
    const rowsDeleted = await Roles.destroy({ where: { idrol: idrol } });

    if (rowsDeleted > 0) {
      mensaje = 'Rol eliminado exitosamente';
    } else {
      res.status(404).json({ error: 'No se encontró un rol con ese ID' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Error al eliminar rol', message: e.message });
  }
  res.json({
    roles: mensaje,
  });
};


module.exports = {
  getRoles,
  postRoles,
  putRoles,
  deleteRoles,
};
