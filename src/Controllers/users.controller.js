const { response } = require('express');
const bcryptjs = require('bcryptjs')
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


const getUserOne = async (req, res = response) => {
  try {
    const { iduser } = req.params;

    const user = await User.findOne({ where: { iduser: iduser } });

    if (!user) {
      return res.status(404).json({ error: 'No se encontró un usuario con ese ID' });
    }

    res.json({
      user,
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      error: 'Error al obtener usuario',
    });
  }
};


const postUser = async (req, res) => {

  let message = '';
  const body = req.body;

  try {

    // Password encryption

    const salt = bcryptjs.genSaltSync();
    body.password = bcryptjs.hashSync(body.password, salt)

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
    const { iduser, idrole, state, password, ...update } = body;

    const user = await User.findOne({ where: { iduser: iduser } });

    if (!user) {
      message = 'No se encontró un usuario con ese ID';
    } else {
      if (password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        update.password = hashedPassword;
      }

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
  getUserOne
};
