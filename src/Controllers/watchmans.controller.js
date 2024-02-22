const { response } = require('express');
const Watchman = require('../Models/watchmans.model');
const UserModel = require('../Models/users.model');
const Rols = require('../Models/rols.model');
const bcryptjs = require('bcryptjs')
const { hotmailTransporter } = require('../Helpers/emailConfig');
const Mails = require('../Helpers/Mails');


const getWatchman = async (req, res = response) => {
  try {
    const watchman = await Watchman.findAll({
      include: [
        {
          model: UserModel,
          as: 'user'
        },
      ]
    });

    console.log('vigilantes obtenidos correctamente:', watchman);

    res.json({
      watchman,
    });
  } catch (error) {

    console.error('Error al obtener vigilantes:', error);

    res.status(500).json({
      error: 'Error al obtener vigilantes',
    });
  }
};



const getWatchmanOne = async (req, res = response) => {
  try {
    const { iduser } = req.params;

    const watchman = await Watchman.findOne({
      where: { iduser: iduser },
      include: [{
        model: UserModel,
        as: "user"
      }]
    });
    console.log('Vigilante obtenido correctamente:', watchman);

    if (!watchman) {
      return res.status(404).json({ error: 'No se encontró un vigilante con ese ID' });
    }

    res.json({
      watchman,
    });
  } catch (error) {
    console.error('Error al obtener vigilante:', error);
    res.status(500).json({
      error: 'Error al obtener vigilante',
    });
  }
};

const getWatchmanDocument = async (req, res = response) => {
  try {
    const { document } = req.params;

    const watchman = await Watchman.findOne({
      include: [{
        model: UserModel,
        where: { document: document }
      }]
    });
    console.log('Vigilante obtenido correctamente:', watchman);

    if (!watchman) {
      return res.status(404).json({ error: 'No se encontró un vigilante con ese documento' });
    }
    res.json({
      watchman,
    });
  } catch (error) {
    console.error('Error al obtener vigilante:', error);
    res.status(500).json({
      error: 'Error al obtener vigilante',
    });
  }
};


const postWatchman = async (req, res) => {

  try {
    let pdfUrl = null;
    let imgUrl = null;

    if (req.files) {
      if (req.files.pdf) {
        pdfUrl = await upload(req.files.pdf, ['pdf'], 'Documents');
      }
      if (req.files.userImg) {
        imgUrl = await upload(req.files.userImg, ['png', 'jpg', 'jpeg'], 'Images');
      }
    }
    const { pdf, userImg, password, name, lastName, email, idEnterpriseSecurity, ...userData } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'La contraseña es requerida' });
    }
    const salt = bcryptjs.genSaltSync();
    userData.password = bcryptjs.hashSync(password, salt);

    const user = await UserModel.create({
      pdf: pdfUrl,
      name: name,
      lastName: lastName,
      email: email,
      userImg: imgUrl,
      password: userData.password,
      status: "Activo",
      ...userData

    })

    console.log('usuario creado correctamente:', user);
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

    const roleData = await Rols.findByPk(userData.idrole);

    // if (user && watchman) {

    //   const mailOptions = Mails.changedStatusEmail(name, lastName, email);

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


    res.json({
      msgUser: "Usuario creado",
      user,
      role: roleData,
      msgResident: "Vigilante creado",
      watchman
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Error al crear el vigilante',
      details: e.message
    });
  }

};



const putWatchman = async (req, res) => {
  const { user: userUpdate, state, ...watchmanUpdate } = req.body;

  try {
    const user = await UserModel.findOne({ where: { iduser: userUpdate.iduser } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await user.update({
      ...userUpdate,
      status: state
    });

    const updatedRole = await Rols.findByPk(user.idrole);

    const nameRole = updatedRole.namerole;

    if (nameRole === 'Vigilante' || nameRole === 'Seguridad' || nameRole === 'Vigilantes') {
      const watchman = await Watchman.findOne({ where: { idwatchman: watchmanUpdate.idwatchman } });
      if (watchman) {
        await watchman.update({
          ...watchmanUpdate,
          state: state
        });

      }
    }

    return res.status(200).json({
      message: 'Usuario y vigilante actualizados correctamente',
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar el usuario y el vigilante',
      error: error.message
    });
  }
};



// const deleteWatchman = async (req, res) => {
//   const { idwatchman } = req.body;
//   let message = '';
//   try {
//     const rowsDeleted = await Watchman.destroy({ where: { idwatchman: idwatchman }, });

//     if (rowsDeleted > 0) {
//       message = 'Vigilante eliminado exitosamente';
//     } else {
//       res.status(404).json({ error: 'No se encontró un vigilante con ese ID' });
//     }
//   } catch (e) {
//     res.status(500).json({ error: 'Error al eliminar vigilante', message: e.message });
//   }
//   res.json({
//     watchman: message,
//   });
// };


module.exports = {
  getWatchman,
  postWatchman,
  putWatchman,
  getWatchmanOne,
  getWatchmanDocument
};
