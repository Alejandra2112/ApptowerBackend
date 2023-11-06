const { Router } = require('express');
const route = Router();
const { logIn } = require('../Controllers/logIn.controller');
const verifityToken = require('../Middlewares/verifityToken');
const User = require('../Models/users.model');

route.post('/', logIn);

route.get('/access', verifityToken, (req, res) => {
  const user = req.user;
  const rol = user.idrole;
  let message = '';

  if (rol == 1) {
    message = 'Es 1: Administrador';
  } else if (rol == 2) {
    message = 'Es 2: residente';
  } else if (rol == 3) {
    message = 'Es 3: vigilante';
  }
  else {
    message = '';
  }

  res.json({
    message: message,
  });
});

module.exports = route;



// const { Router } = require('express');
// const route = Router();
// const { logIn } = require('../Controllers/login');
// const verifityToken = require('../Middlewares/verifityToken');
// const User = require('../Models/user');
// const Roles = require('../Models/rols');
// const RolPermissions = require('../Models/rolsPermissions');

// route.post('/', logIn);

// route.get('/access', verifityToken, async (req, res) => {
//   const user = req.user;
//   const rol = user.rol;

//   try {
//     const roles = await Roles.findByPk(rol.idrol, {
//       include: RolPermissions,
//     });

//     if (!roles) {
//       return res.status(401).json({ message: 'Rol no válido' });
//     }

//     const permisos = roles.rol_permissions.map((rp) => rp.permission);

//     res.json({ usuario: user.nombre_de_usuario, rol: rol.nombreRol, permisos: permisos });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error interno del servidor' });
//   }
// });

// module.exports = route;
