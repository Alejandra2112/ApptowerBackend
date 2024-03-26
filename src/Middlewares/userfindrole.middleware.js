const RoleModel = require('../Models/rols.model.js');

const roleBasedValidation = async (req, res, next) => {
    const { idrole } = req.body;

    console.log('idrole: aqui en middlewareeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', idrole);

    if (!idrole) {
        return res.status(400).json({ error: 'El idrole es requerido.' });
    }

    try {
        const role = await RoleModel.findOne({ where: { idrole } });

        console.log('role: aqui en middlewareeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', role);

        if (!role) {
            return res.status(400).json({ error: 'El idrole proporcionado no existe.' });
        }

        const roleName = role.dataValues.namerole.toLowerCase();

        req.roleName = roleName;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { roleBasedValidation };