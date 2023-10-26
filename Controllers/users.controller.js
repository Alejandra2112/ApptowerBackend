const { response } = require('express');
const User = require('../Models/users.model');


const getUser = async (req, res = response) => {
    try {
      const user = await User.findAll();

      console.log('usuarios obtenidos correctamente:', user);
  
      res.json({
        user,
      });
    } catch (error) {

      console.error('Error al obtener usuarios:', error);
  
      res.status(500).json({
        error: 'Error al obtener usuarios',
      });
    }  
};


const postUser = async (req, res) => {
  let message = '';
  const body = req.body; 
  try {
    await User.create(body);
    message = 'Usuario Registrado Exitosamente';
  } catch (e) {
    message = e.message;
  }
  res.json({
    user: message,
  });
};


const putUser = async (req, res = response) => {
  const body = req.body;
  let message = '';

  try {
    const { iduser, idrole, state, ...update } = body;

    const user = await User.findOne({ where: { iduser: iduser } });

    if (!user) {
      message = 'No se encontró un usuario con ese ID';
    } else {
      await user.update({ idrole, state, ...update }, { force: true });

      message = 'Usuario modificado exitosamente.';
    }
  } catch (error) {
    message = 'Error al modificar usuario: ' + error.message;
  }

  res.json({
    user: message,
  });
};


const deleteUser = async (req, res) => {
  const { iduser } = req.body;
  let message = '';
  try {
    const rowsDeleted = await User.destroy({ where: { iduser: iduser } });

    if (rowsDeleted > 0) {
      message = 'Usuario eliminado exitosamente';
    } else {
      res.status(404).json({ error: 'No se encontró un usuario con ese ID' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Error al eliminar usuario', message: e.message });
  }
  res.json({
    user: message,
  });
};


module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser,
};
