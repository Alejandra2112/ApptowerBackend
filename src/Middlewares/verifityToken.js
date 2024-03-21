const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Acceso denegado' });
  }

  const token = authHeader.split(' ')[1];

  console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.MISECRETKEY);
    req.user = decoded;
    console.log('Contenido de req.user:', req.user);

    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ mensaje: 'Token no válido' });
  }
};

module.exports = verificarToken;