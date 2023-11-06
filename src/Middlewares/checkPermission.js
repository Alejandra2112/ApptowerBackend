const RolsPermissions = require("../Models/rolsPermissions.model");
const User = require("../Models/users.model");

const checkPermissions = (privilege, permission) => {
    return async (req, res, next) => {
        const { idrole } = req.user;

        console.log('Id del rol:', idrole);
        console.log('Permiso:', permission);
        console.log('Privilegio:', privilege);

        try {
            const havePermissions = await RolsPermissions.findOne({
                where: { idrole, idprivilege: privilege, idpermission: permission, },
            });

            console.log('Resultado de la consulta a la base de datos:', havePermissions);

            if (!havePermissions) {
                return res.status(403).json({ message: 'No tienes permisos para esta acción' });
            }

            next();
        } catch (error) {
            console.error('Error al verificar los permisos:', error);
            res.status(500).json({ message: 'Error en la verificación de permisos' });
        }
    };
};


module.exports = checkPermissions;
