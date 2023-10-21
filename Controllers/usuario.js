const { response } = require('express');
const Usuario = require('../Models/usuario');


const getUsuario = async (req, res = response) => {
    try {
      const usuarios = await Usuario.findAll();

      console.log('Usuarios obtenidos correctamente:', usuarios);
  
      res.json({
        usuarios,
      });
    } catch (error) {

      console.error('Error al obtener usuarios:', error);
  
      res.status(500).json({
        error: 'Error al obtener usuarios',
      });
    }  
};


const postUsuario = async (req, res) => {

  
  let mensaje = '';
  const body = req.query; 
  try {
    await Usuario.create(body);
    mensaje = 'Usuario Registrado Exitosamente';
  } catch (e) {
    mensaje = e.message;
  }
  res.json({
    usuario: mensaje,
  });
};


const putUsuario = async (req, res = response) => {
  const body = req.query;
  let mensaje = '';

  try {
    const { idusuario, ...actualizacion } = body;

    const [updatedRows] = await Usuario.update(actualizacion, {
      where: { idusuario: idusuario },
    });

    if (updatedRows > 0) {
      mensaje = 'Usuario modificado exitosamente.';
    } else {
      mensaje = 'No se encontró un usuario con ese ID';
    }
  } catch (error) {
    mensaje = 'Error al modificar usuario: ' + error.message;
  }
  res.json({
    usuario: mensaje,
  });
};


const deleteUsuario = async (req, res) => {
  const { idusuario } = req.query;
  let mensaje = '';
  try {
    const rowsDeleted = await Usuario.destroy({ where: { idusuario: idusuario } });

    if (rowsDeleted > 0) {
      mensaje = 'Usuario eliminado exitosamente';
    } else {
      res.status(404).json({ error: 'No se encontró un usuario con ese ID' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Error al eliminar usuario', message: e.message });
  }
  res.json({
    usuario: mensaje,
  });
};


module.exports = {
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
};
