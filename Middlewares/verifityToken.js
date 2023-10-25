const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado' });
  }

  const tokenSecret = token.split(' ')[1]
  
  try {
    console.log(JSON.stringify(token));
    console.log(JSON.stringify(tokenSecret));
    const decoded = jwt.verify(tokenSecret, process.env.MISECRETKEY, { ignoreExpiration: false });
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ mensaje: 'Token no válido' });
  }
};

module.exports = verificarToken;
