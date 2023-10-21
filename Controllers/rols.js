const { response } = require('express');
const Rols = require('../Models/rols');


const getRols = async (req, res = response) => {
    try {
      const rols = await Rols.findAll();

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
  const body = req.body; 
  try {
    await Rols.create(body); 
    message = 'Rol Registrado Exitosamente';
  } catch (e) {
    message = e.message;
  }
  res.json({
    rols: message,
  });
};


const putRols = async (req, res = response) => {
  const body = req.body;
  let message = '';

  try {
    const { idrol, ...update } = body;

    const [updatedRows] = await Rols.update(update, {
      where: { idrol: idrol },
    });

    if (updatedRows > 0) {
      message = 'Rol modificado exitosamente.';
    } else {
      message = 'No se encontró un rol con ese ID';
    }
  } catch (error) {
    message = 'Error al modificar rol: ' + error.message;
  }
  res.json({
    rols: message,
  });
};


const deleteRols = async (req, res) => {
  const { idrol } = req.body;
  let message = '';
  try {
    const rowsDeleted = await Rols.destroy({ where: { idrol: idrol } });

    if (rowsDeleted > 0) {
      message = 'Rol eliminado exitosamente';
    } else {
      res.status(404).json({ error: 'No se encontró un rol con ese ID' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Error al eliminar rol', message: e.message });
  }
  res.json({
    roles: message,
  });
};


module.exports = {
  getRols,
  postRols,
  putRols,
  deleteRols,
};
