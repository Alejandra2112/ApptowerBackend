const jwt = require('jsonwebtoken');
const Usuario = require('../Models/usuario');

const iniciarSesion = async (req, res) => {
  const { documento, contrasena } = req.query;

  try {
    const usuario = await Usuario.findOne({ where: { documento } });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }
    if (contrasena !== usuario.contrasena) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const tokenPayload = {
      idusuario: usuario.idusuario,
      rol: usuario.idrol, 
    };

    const token = jwt.sign(tokenPayload, process.env.MISECRETKEY, {
      expiresIn: '30d',
    });

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = {
  iniciarSesion,
};
