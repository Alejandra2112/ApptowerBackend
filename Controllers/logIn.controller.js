const jwt = require('jsonwebtoken');
const User = require('../Models/users.model');
const Rols = require('../Models/rols.model');

const logIn = async (req, res) => {
  const { document, password } = req.body;

  try {
    const user = await User.findOne({ where: { document } });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    const userWithRole = await User.findByPk(user.iduser, {
      include: Rols,
    });

    if (!userWithRole) {
      return res.status(500).json({ message: 'Error' });
    }
    const userRoleId = user.idrole; 


    const tokenPayload = {
      iduser: user.iduser,
      rol: userRoleId, 
    };

    const token = jwt.sign(tokenPayload, process.env.MISECRETKEY, {
      expiresIn: '30d',
    });

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
