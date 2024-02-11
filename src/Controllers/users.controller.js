const { response } = require('express');
const bcryptjs = require('bcryptjs')
const UserModel = require('../Models/users.model');
const Rols = require('../Models/rols.model');
const ResidentModel = require('../Models/resident.model');
const Watchman = require('../Models/watchmans.model');
const { upload, updateFile } = require('../Helpers/uploads.helpers');


const getUser = async (req, res = response) => {
  try {

    const user = await UserModel.findAll();
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

    const user = await UserModel.findOne({ where: { iduser: iduser } });

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


const getUserDocument = async (req, res = response) => {
  try {
    const { document } = req.params;

    const user = await UserModel.findOne({ where: { document: document } });

    if (user) {
      return res.status(409).json({ message: 'Ya existe un usuario con este documento.' });
    }

    res.status(200).json({
      user,
    });

  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      error: 'Error al obtener usuario',
    });
  }
}


const getEmailUser = async (req, res = response) => {
  try {
    const { email } = req.params;

    const user = await UserModel.findOne({ where: { email: email } });

    if (user) {
      return res.status(409).json({ message: 'Ya existe un usuario con este correo.' });
    }

    res.status(200).json({
      user,
    });

  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      error: 'Error al obtener usuario',
    });

  }
}

const postUserEmail = async (req, res) => {


  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: 'No se encontró un usuario con ese correo electrónico.' });
    }

    return res.json({ message: 'Usuario encontrado exitosamente.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar usuario: ' + error.message });
  }
};


const resetPassword = async (req, res = response) => {
  const { email, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(newPassword, salt);

    await user.save();

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ message: 'Error al restablecer la contraseña' });
  }
};



const postUsersforLogin = async (req, res) => {
  try {
    const { idrole, state, password, ...userData } = req.body;

    if (userData.idrole === undefined || userData.idrole === null) {
      userData.idrole = 2;
      userData.state = 'Inactivo';
    }

    if (userData.password) {
      const salt = bcryptjs.genSaltSync();
      userData.password = bcryptjs.hashSync(userData.password, salt);
    }

    const user = await UserModel.create({
      ...userData,
      idrole: userData.idrole,
      state: userData.state,
      password: userData.password,
    });

    if (user) {
      res.status(201).json({
        message: 'Usuario creado exitosamente',
        user,
      });
    } else {
      res.status(400).json({
        message: 'Error al crear el usuario',
      });
    }
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({
      message: `Error al crear el usuario: ${error.message}`,
    });
  }
};



// Post user with user image and pdf file 

const postUser = async (req, res) => {
  try {

    const pdfUrl = await upload(req.files.pdf, ['pdf'], 'Documents')
    const imgUrl = req.files !== null ? await upload(req.files.userImg, ['png', 'jpg', 'jpeg'], 'Images') : null

    const { pdf, ...userData } = req.body;

    const salt = bcryptjs.genSaltSync();
    userData.password = bcryptjs.hashSync(userData.password, salt);

    const user = await UserModel.create({
      pdf: pdfUrl,
      userImg: imgUrl,
      idrole: userData.idrole, // resident rol 
      password: userData.password,
      ...userData

    })

    const roleData = await Rols.findByPk(userData.idrole);

    res.json({

      msgUser: "Usuario creado",
      user,
      role: roleData
    })




  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor hola', error: error.message });
  }

};



const putPersonalInformation = async (req, res = response) => {
  try {
    const { iduser, pdf, ...newData } = req.body;

    const user = await UserModel.findOne({ where: { iduser: iduser } });

    // Llamar a la función updateFile y esperar su resultado
    const newPdf = await updateFile(req.files, pdf, ['pdf'], 'Documents', 'newFile');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado.' });
    }

    console.log(newPdf)

    const updatedUser = await user.update({
      pdf: newPdf,
      docType: newData.docType,
      document: newData.document,
      name: newData.name,
      lastName: newData.lastName,
      birthday: newData.birthday,
      sex: newData.sex,
      email: newData.email,
      phone: newData.phone,
    });

    res.json({
      msg: "Actualizaste información personal",
      user: updatedUser
    });

  } catch (error) {
    console.error('Error al editar usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};


const putChangeImg = async (req, res = response) => {
  try {
    const { iduser, ...newData } = req.body;

    console.log(req.files, "file")

    const user = await UserModel.findOne({ where: { iduser: iduser } });

    if (!user) {
      return res.status(404).json({ msg: 'usuario no encontrada.' });
    }

    const newImg = user.userImg == "" && req.files ?
      await upload(req.files.userImg, ['png', 'jpg', 'jpeg'], 'Images') :
      req.files ? await updateFile(req.files, user.userImg, ['png', 'jpg', 'jpeg'], 'Images', "userImg") : ""


    console.log(user.userImg, "Old img")
    console.log(newImg, "newImg")


    const updatedUser = await user.update({

      userImg: newImg == "" ? newData.userImg : newImg,
    });

    res.json({
      msg: "Imgen actualizada",
      user: updatedUser
    });

  } catch (error) {
    console.error('Error al editar usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};


const putUser = async (req, res) => {
  let message = '';

  try {
    const { iduser } = req.params;
    const { idrole, state, password, pdf, ...update } = req.body;

    const user = await UserModel.findOne({ where: { iduser: iduser } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const oldRole = await Rols.findByPk(user.idrole);
    const newRole = await Rols.findByPk(idrole);

    // Actualizar usuario con el nuevo rol
    const newPdf = await updateFile(req.files, user.pdf, ['pdf'], 'Documents');
    if (password) {
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(password, salt);
      update.password = hashedPassword;
    }
    await user.update({ idrole, state, pdf: newPdf, ...update }, { force: true });

    if (oldRole.id !== newRole.id) {
      // Eliminar residente si cambia a vigilante
      if (oldRole.namerole === 'Residente' && newRole.namerole !== 'Residente') {
        const residente = await ResidentModel.findOne({ where: { docNumber: user.document } });
        if (residente) {
          await residente.destroy();
        }
      }

      // Eliminar vigilante si cambia a residente
      if (oldRole.namerole !== 'Residente' && newRole.namerole === 'Residente') {
        const vigilante = await Watchman.findOne({ where: { document: user.document } });
        if (vigilante) {
          await vigilante.destroy();
        }
      }

      // Crear nuevo residente si cambia a residente
      if (newRole.namerole === 'Residente') {
        await ResidentModel.create({
          docType: user.documentType,
          docNumber: user.document,
          phoneNumber: user.phone,
          email: user.email,
          name: user.name,
          lastName: user.lastname,
          pdf: req.body.pdf,
          birthday: req.body.birthday,
          sex: req.body.sex,
          residentType: req.body.residentType,
          status: 'Active',
        });
      }

      // Crear nuevo vigilante si cambia a vigilante
      if (newRole.namerole !== 'Residente') {
        await Watchman.create({
          documentType: user.documentType,
          document: user.document,
          namewatchman: user.name,
          lastnamewatchman: user.lastname,
          phone: user.phone,
          email: user.email,
          dateOfbirth: req.body.dateOfbirth,
          state: 'Activo',
        });
      }
    }

    // Actualizar datos según el nuevo rol
    if (newRole.namerole === 'Residente') {
      const resident = await ResidentModel.findOne({ where: { docNumber: user.document } });
      if (resident) {
        await resident.update({ name: user.name, lastName: user.lastname, phoneNumber: user.phone, email: user.email });
      }
    } else {
      const watchman = await Watchman.findOne({ where: { document: user.document } });
      if (watchman) {
        await watchman.update({ namewatchman: user.name, lastnamewatchman: user.lastname, phone: user.phone, email: user.email });
      }
    }

    message = 'Usuario modificado exitosamente.';
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
  getUserDocument,
  postUser,
  putUser,
  getUserOne,
  postUserEmail,
  postUsersforLogin,
  resetPassword,
  getEmailUser,


  putChangeImg,
  putPersonalInformation

};
