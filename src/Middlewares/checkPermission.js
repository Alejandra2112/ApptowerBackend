// const Roles = require('../Models/rols.model');
// const Permissions = require('../Models/permissions.model');
// const User = require('../Models/users.model');
// const RolPermissions = require('../Models/rolsPermissions.model');

// const checkPermission =  async(req, res, next) => {

//   const userId = req.user.iduser; 
//   const functionality = req.params.functionality; 

//   try {
   
//     const user = await User.findByPk(userId, {
//       include: Roles, 
//     });

//     if (!user) {
//       return res.status(401).json({ message: 'Usuario no válido' });
//     }

//     const rol = user.rol;
//     const rolPermissions = await RolPermissions.findAll({
//       where: { idRol: rol.idrol },
//       include: Permissions,
//     });

//     if (!rolPermissions) {
//       return res.status(401).json({ message: 'Rol de usuario no válido' });
//     }

//     const hasPermission = rolPermissions.some((rp) =>
//       rp.permissions.some((p) => p.permission === functionality)
//     );

//     if (!hasPermission) {
//       return res.status(403).json({ message: 'Acceso denegado' });
//     }
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error interno del servidor' });
//   }
// }

// module.exports = checkPermission;
