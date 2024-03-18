const jwt = require('jsonwebtoken');
const User = require('../Models/users.model');
const Rols = require('../Models/rols.model');
const Privilege = require('../Models/privileges.model');
const Permission = require('../Models/permissions.model');
const rolsPermissions = require('../Models/rolsPermissions.model');
const bcryptjs = require('bcryptjs')

const getPermissionFromRole = async (req, res) => {
    const user = req.user;
    const roleId = user.idrole;

    try {
        const role = await Rols.findByPk(roleId, {
            include: 'permissionRols',
        });

        if (!role) {
            return res.status(401).json({ message: 'R   ol no válido' });
        }

        const permissions = role.permissionRols.map((rp) => rp.idpermission);


        const uniquePermissions = Array.from(new Set(permissions));

        res.json({ permissions: uniquePermissions });
    } catch (error) {
        console.error('Error al obtener permisos:', error);
        res.status(500).json({ message: 'Error' });
    }
}

const getInformationUser = async (req, res) => {
    const user = req.user;
    const iduser = user.iduser;
    const idrole = user.idrole;

    try {
        const user = await User.findByPk(iduser);

        const nameRole = await Rols.findByPk(idrole, {
            attributes: ['namerole']
        })

        console.log(nameRole, 'nameRole')

        if (!user) {
            return res.status(401).json({ message: 'Usuario no válido' });
        }
        const roleName = nameRole ? nameRole.namerole.toLowerCase() : null;
        res.json({ user, rolName: roleName });
    } catch (error) {
        console.error('Error al obtener información de usuario:', error);
        res.status(500).json({ message: 'Error' });
    }
}



const getPrivilegeFromRole = async (req, res) => {
    const user = req.user;
    const roleId = user.idrole;

    try {
        const roles = await rolsPermissions.findAll({
            where: { idrole: roleId },
            include: [
                { model: Permission },
                { model: Privilege }
            ]
        });

        if (!roles) {
            return res.status(401).json({ message: 'Rol no válido' });
        }

        const privileges = roles.map((role) => ({
            idpermission: role.idpermission,
            idprivilege: role.idprivilege,
        }));

        res.json({ privileges });
    } catch (error) {
        console.error('Error al obtener privilegios:', error);
        res.status(500).json({ message: 'Error' });
    }
};

const putInformationUser = async (req, res) => {
    const user = req.user;
    const iduser = user.iduser;
    const { name, lastname, phone, email, password } = req.body;

    try {
        const userToUpdate = await User.findByPk(iduser);

        if (!userToUpdate) {
            return res.status(401).json({ message: 'Usuario no válido' });
        }

        let hashedPassword;
        try {
            const salt = bcryptjs.genSaltSync();
            password = bcryptjs.hashSync(password, salt);
            hashedPassword = await bcryptjs.hash(password, 10);
        } catch (hashedPassword) {
            console.error('Error al encriptar la contraseña:', hashError);
            return res.status(500).json({ message: 'Error al encriptar la contraseña' });
        }

        await userToUpdate.update({
            name,
            lastname,
            phone,
            email,
            password: hashedPassword
        });

        res.json({ user: userToUpdate });
    } catch (error) {
        console.error('Error al obtener información de usuario:', error);
        res.status(500).json({ message: 'Error al actualizar la información del usuario' });
    }
};


module.exports = {
    getPermissionFromRole,
    getInformationUser,
    getPrivilegeFromRole,
    putInformationUser
}
