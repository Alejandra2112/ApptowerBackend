const jwt = require('jsonwebtoken');
const User = require('../Models/user');

const logIn = async (req, res) => {
  const { document, password } = req.body;

  try {
    const user = await User.findOne({ where: { document } });

    if (!user) {
      return res.status(401).json({ message: 'user no encontrado' });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const tokenPayload = {
      iduser: user.iduser,
      rol: user.idrol, 
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
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
  logIn,
};
