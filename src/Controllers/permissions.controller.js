const { response } = require('express');
const Permission = require('../Models/permissions.model');

const getPermissions = async (req, res = response) => {
  try {
    const permission = await Permission.findAll();
    console.log('datos de permisos obtenidos correctamente:', permission );

    res.json({
      permission
    });
  } catch (error) {

    console.error(error);

    res.status(500).send('Error al cargar datos permisos.');
  }
};

const postPermissions = async (req, res) => {
  let message = '';
  const body = req.body; 
  try {
    await Permission.create(body); 
    message = 'Permiso Registrado Exitosamente';
  } catch (e) {
    message = e.message;
  }
  res.json({
    permission: message,
  });
};

const putPermission = async (req, res = response) => {
  const body = req.body;
  let message = '';

  try {
    const { idpermission, ...update } = body;

    const [updatedRows] = await Permission.update(update, {
      where: { idpermission: idpermission },
    });

    if (updatedRows > 0) {
      message = 'Permiso modificado exitosamente.';
    } else {
      message = 'No se encontró un permiso con ese ID';
    }
  } catch (error) {
    message = 'Error al modificar permiso: ' + error.message;
  }
  res.json({
    permission: message,
  });
};



const deletePermissions = async (req, res) => {
  const { idpermission } = req.body;
  let message = '';
  try {
    const rowsDeleted = await Permission.destroy({ where: { idpermission: idpermission } });

    if (rowsDeleted > 0) {
      message = 'Permiso eliminado exitosamente';
    } else {
      res.status(404).json({ error: 'No se encontró un permiso con ese ID' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Error al eliminar permiso', message: e.message });
  }
  res.json({
    permission: message,
  });
};


module.exports = {
  putPermission,
  getPermissions,
  postPermissions,
  deletePermissions
}
