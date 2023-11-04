const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.MISECRETKEY, { ignoreExpiration: false });

    if (!decoded.idrole) {
      return res.status(401).json({ mensaje: 'Token no válido...' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ mensaje: 'Token no válido' });
  }
};

module.exports = verificarToken;
