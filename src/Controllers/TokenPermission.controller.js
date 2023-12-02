const jwt = require('jsonwebtoken');
const User = require('../Models/users.model');
const Rols = require('../Models/rols.model');

const getPermissionFromRole = async (req, res) => {
    const user = req.user;
    const roleId = user.idrole;

    try {
        const role = await Rols.findByPk(roleId, {
            include: 'permissionRols',
        });

        if (!role) {
            return res.status(401).json({ message: 'Rol no válido' });
        }

        const permissions = role.permissionRols.map((rp) => rp.idpermission);


        const uniquePermissions = Array.from(new Set(permissions));

        res.json({ permissions: uniquePermissions });
    } catch (error) {
        console.error('Error al obtener permisos:', error);
        res.status(500).json({ message: 'Error' });
    }
}

module.exports = {
    getPermissionFromRole
}
