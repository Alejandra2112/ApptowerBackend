const { response } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../Models/users.model');
const Rols = require('../Models/rols.model');
const ResidentModel = require('../Models/resident.model');
const Watchman = require('../Models/watchmans.model');
const { upload, updateFile } = require('../Helpers/uploads.helpers');


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

const postUserEmail = async (req, res) => {


  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: 'No se encontró un usuario con ese correo electrónico.' });
    }

    return res.json({ message: 'Usuario encontrado exitosamente.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar usuario: ' + error.message });
  }
};


const postUser = async (req, res) => {
  try {

    const imageUrl = await upload(req.files.pdf, ['pdf'], 'Documents')
    const { pdf, ...userData } = req.body;

    if (userData.state === 'Activo' && userData.idrole) {
      if (userData.password) {
        const salt = bcryptjs.genSaltSync();
        userData.password = bcryptjs.hashSync(userData.password, salt);
      }

      const user = await User.create({
        ...userData,
        pdf: imageUrl
      });
      console.log('Fecha de nacimiento recibida:', req.body.dateOfbirth);
      const formattedDate = new Date(req.body.dateOfbirth).toISOString();
      console.log('Fecha formateada:', formattedDate);


      const roleData = await Rols.findByPk(userData.idrole);


      if (['Vigilante', 'Seguridad', 'Vigilantes'].includes(roleData.namerole)) {
        // const dateOfBirth = new Date(req.body.dateOfbirth);

        const watchman = await Watchman.create({
          namewatchman: user.name,
          lastnamewatchman: user.lastname,
          documentType: user.documentType,
          document: user.document,
          phone: user.phone,
          email: user.email,
          dateOfbirth: new Date(req.body.dateOfbirth),
          state: 'Activo',
        });
      } else if (['Residente', 'Residentes'].includes(roleData.namerole)) {
        // const birthday = new Date(req.body.birthday);
        const resident = await ResidentModel.create({
          name: user.name,
          lastName: user.lastname,
          docType: user.documentType,
          docNumber: user.document,
          phoneNumber: user.phone,
          email: user.email,
          pdf: req.body.pdf,
          birthday: req.body.birthday,
          sex: req.body.sex,
          residentType: req.body.residentType,
          status: 'Active',
        });
      }

      return res.status(201).json({ message: 'Usuario Registrado Exitosamente' });
    } else {
      return res.status(400).json({ message: 'El usuario no está activo o no tiene un rol asignado' });
    }
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor hola', error: error.message });
  }

};



const putUser = async (req, res) => {
  const body = req.body;
  let message = '';

  try {
    const { iduser, idrole, state, password, ...update } = body;

    const user = await User.findOne({ where: { iduser: iduser } });

    if (!user) {
      message = 'No se encontró un usuario con ese ID';
    } else {
      if (password) {
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(password, salt);

        update.password = hashedPassword;
      }

      await user.update({ idrole, state, ...update }, { force: true });
      await user.reload();

      message = 'Usuario modificado exitosamente.';
    }
  } catch (error) {
    message = 'Error al modificar usuario: ' + error.message;
  }

  res.json({
    user: message,
  });
};



// const deleteUser = async (req, res) => {
//   const { iduser } = req.body;
//   let message = '';
//   try {
//     const rowsDeleted = await User.destroy({ where: { iduser: iduser } });

//     if (rowsDeleted > 0) {
//       message = 'Usuario eliminado exitosamente';
//     } else {
//       res.status(404).json({ error: 'No se encontró un usuario con ese ID' });
//     }
//   } catch (e) {
//     res.status(500).json({ error: 'Error al eliminar usuario', message: e.message });
//   }
//   res.json({
//     user: message,
//   });
// };


module.exports = {
  getUser,
  postUser,
  putUser,
  getUserOne,
  postUserEmail,
};
