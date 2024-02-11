const { response } = require('express');
const bcryptjs = require('bcryptjs')
const UserModel = require('../Models/users.model');
const Rols = require('../Models/rols.model');
const ResidentModel = require('../Models/resident.model');
const Watchman = require('../Models/watchmans.model');
const { upload, updateFile } = require('../Helpers/uploads.helpers');
const ApartmentResidentModel = require('../Models/apartment.residents.model');
const { hotmailTransporter } = require('../Helpers/emailConfig');
const Mails = require('../Helpers/Mails');


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

    const pdfUrl = req.files !== null ? await upload(req.files.pdf, ['pdf'], 'Documents') : null
    const imgUrl = req.files !== null ? await upload(req.files.userImg, ['png', 'jpg', 'jpeg'], 'Images') : null

    const { pdf, userImg, idEnterpriseSecurity, residentType, idApartment, ...userData } = req.body;

    const salt = bcryptjs.genSaltSync();
    userData.password = bcryptjs.hashSync(userData.password, salt);

    const user = await UserModel.create({
      pdf: pdfUrl,
      userImg: imgUrl,
      password: userData.password,
      ...userData

    })

    // if (user) {
    //   const mailOptions = Mails.changedStatusEmail(user.name, user.lastName, user.email);

    //   hotmailTransporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       console.error('Error al enviar el correo:', error);
    //       res.status(500).json({ message: 'Error al enviar el correo' });
    //     } else {
    //       console.log('Correo enviado:', info.response);
    //       res.json({ message: 'Correo con código de recuperación enviado' });
    //     }
    //   });
    // }

    const role = await Rols.findOne({ where: { idrole: userData.idrole } });
    const roleName = role ? role.namerole.toLowerCase() : null;

    let watchman;
    if (roleName && (roleName.includes('vigilante') || roleName.includes('seguridad') || roleName.includes('vigilancia'))) {
      watchman = await Watchman.create({
        iduser: user.iduser,
        state: "Activo",
        idEnterpriseSecurity: idEnterpriseSecurity,
      });
    }

    let resident;
    let apartment;

    if (roleName && roleName.includes('residente')) {
      resident = await ResidentModel.create({
        iduser: user.iduser,
        residentType: residentType,
        status: "Active"
      })

      await ApartmentResidentModel.create({
        idApartment: idApartment,
        idResident: resident.idResident
      });
    }

    const roleData = await Rols.findByPk(userData.idrole);

    const response = {
      msgUser: "Usuario creado",
      user,
      role: roleData,
    };

    if (watchman) {
      response.msgWatchman = "Vigilante creado";
      response.watchman = watchman;
    }

    if (resident) {
      response.msgResident = "Residente creado";
      response.resident = resident;
    }

    res.json(response);


  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor hola', error: error.message });
  }

};

// Post Alejandra

// const postUser = async (req, res) => {
//   try {

//     const imageUrl = await upload(req.files.pdf, ['pdf'], 'Documents')
//     const { pdf, ...userData } = req.body;

//     if (userData.state === 'Activo' && userData.idrole) {
//       if (userData.password) {
//         const salt = bcryptjs.genSaltSync();
//         userData.password = bcryptjs.hashSync(userData.password, salt);
//       }

//       const user = await User.create({
//         ...userData,
//         pdf: imageUrl
//       });


//       const roleData = await Rols.findByPk(userData.idrole);


//       if (['Vigilante', 'Seguridad', 'Vigilantes'].includes(roleData.namerole)) {
//         // const dateOfBirth = new Date(req.body.dateOfbirth);

//         const watchman = await Watchman.create({
//           namewatchman: user.name,
//           lastnamewatchman: user.lastname,
//           documentType: user.documentType,
//           document: user.document,
//           phone: user.phone,
//           email: user.email,
//           dateOfbirth: new Date(req.body.dateOfbirth),
//           state: 'Activo',
//         });
//       } else if (['Residente', 'Residentes'].includes(roleData.namerole)) {
//         // const birthday = new Date(req.body.birthday);
//         const resident = await ResidentModel.create({
//           name: user.name,
//           lastName: user.lastname,
//           docType: user.documentType,
//           docNumber: user.document,
//           phoneNumber: user.phone,
//           email: user.email,
//           pdf: req.body.pdf,
//           birthday: req.body.birthday,
//           sex: req.body.sex,
//           residentType: req.body.residentType,
//           status: 'Active',
//         });
//       }

//       return res.status(201).json({ message: 'Usuario Registrado Exitosamente' });
//     } else {
//       return res.status(400).json({ message: 'El usuario no está activo o no tiene un rol asignado' });
//     }
//   } catch (error) {
//     console.error('Error al crear usuario:', error);
//     return res.status(500).json({ message: 'Error interno del servidor hola', error: error.message });
//   }

// };




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
  resetPassword,
  getEmailUser,


  putChangeImg,
  putPersonalInformation

};
