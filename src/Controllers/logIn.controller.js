const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../Models/users.model');
const Rols = require('../Models/rols.model');
const { Op } = require('sequelize');
const { GmailTransporter } = require('../Helpers/emailConfig');
const successRegistrationEmail = require('../Helpers/Mails');
const Mails = require('../Helpers/Mails');
const rolsPermissions = require('../Models/rolsPermissions.model');
const Permissions = require('../Models/permissions.model');
const Privileges = require('../Models/privileges.model');

const logIn = async (req, res) => {

  try {
    const { usuario, password } = req.body;


    const user = await UserModel.findOne({
      where: {
        [Op.or]: [
          { document: usuario },
          { email: usuario }
        ]
      }
    });


    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    if (user.status !== 'Activo') {
      return res.status(401).json({ message: 'Ha ocurrido un problema, comunícate con el Administrador' });
    }

    const userRoleId = user.idrole;
    console.log("idrole", userRoleId);


    /// Obtener permisos y privilegios del rol
    const roles = await rolsPermissions.findAll({
      where: { idrole: userRoleId },
      include: [
        { model: Permissions },
        { model: Privileges }
      ]
    });

    const PermissionsAndPrivileges = roles.map((role) => ({
      idpermission: role.idpermission,
      idprivilege: role.idprivilege,
    }));


    const tokenPayload = {
      iduser: user.iduser,
      idrole: userRoleId,
    };

    const userPayload = {
      iduser: user.iduser,
      name: user.name,
      lastName: user.lastName,
      idrole: userRoleId,
    };

    const RolePrivilegesPayload = {
      PermissionsAndPrivileges
    }


    const token = jwt.sign(tokenPayload, process.env.MISECRETKEY, {
      expiresIn: '365d',
    });

    res.cookie('token', token, { httpOnly: false, secure: true, sameSite: 'none' });
    res.cookie('user', JSON.stringify(userPayload), { httpOnly: false, secure: true, sameSite: 'none' });
    res.cookie('permisosAndPrivileges', JSON.stringify(RolePrivilegesPayload), { httpOnly: false, secure: true, sameSite: 'none' });


    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      PermissionsAndPrivileges,
      user: userPayload,
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error' });
  }
};



const postUsersforLogin = async (req, res) => {
  try {
    const { idrole, state, password, name, email, lastName, ...userData } = req.body;

    let newIdRole = idrole;
    if (newIdRole === undefined || newIdRole === null) {
      newIdRole = 2;
      userData.status = 'Inactivo';
    }

    let hashedPassword;
    if (password) {
      const salt = bcrypt.genSaltSync();
      hashedPassword = bcrypt.hashSync(password, salt);
    }

    const user = await UserModel.create({
      ...userData,
      idrole: newIdRole,
      state: userData.state,
      password: hashedPassword,
      name: name,
      lastName: lastName,
      email: email,
    });

    if (user) {
      res.status(201).json({
        message: 'Usuario creado exitosamente',
        user,
      });

      const mailOptions = Mails.registerSuccessEmail(name, lastName, email);

      GmailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo:', error);
          res.status(500).json({ message: 'Error al enviar el correo' });
        } else {
          console.log('Correo enviado:', info.response);
          res.json({ message: 'Correo con código de recuperación enviado' });
        }
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


module.exports = {
  logIn,
  postUsersforLogin
};