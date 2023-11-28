const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/users.model');
const Rols = require('../Models/rols.model');

const logIn = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await User.findOne({ where: { document: usuario } });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    if (user.state !== 'Activo') {
      return res.status(401).json({ message: 'Ha ocurrido un problema, comunícate con el Administrador' });
    }

    const userWithRole = await User.findByPk(user.iduser, {
      include: Rols,
    });

    if (!userWithRole) {
      return res.status(500).json({ message: 'Ocurrió un error' });
    }
    const userRoleId = user.idrole;
    console.log("idrole", userRoleId);

    const tokenPayload = {
      iduser: user.iduser,
      idrole: userRoleId,
    };

    const token = jwt.sign(tokenPayload, process.env.MISECRETKEY, {
      expiresIn: '365d',
    });

    res.cookie('token', token);

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error' });
  }
};

module.exports = {
  logIn,
};
