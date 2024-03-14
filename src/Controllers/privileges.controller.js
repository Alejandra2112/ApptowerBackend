const { response } = require('express');
const Privileges = require('../Models/privileges.model');

const getPrivileges = async (req, res = response) => {
    try {
        const privileges = await Privileges.findAll();
        console.log('datos de privilegios obtenidos correctamente:', privileges);

        res.json({
            privileges
        });
    } catch (error) {

        console.error(error);

        res.status(500).send('Error al cargar datos privileges.');
    }
};

const postPrivileges = async (req, res) => {
    let message = '';
    const body = req.body;
    try {
        await Privileges.bulkCreate(body);
        message = 'Privilegios Registrados Exitosamente';
    } catch (e) {
        message = e.message;
    }
    res.json({
        privileges: message,
    });
};

const putPrivileges = async (req, res = response) => {
    const body = req.body;
    let message = '';

    try {
        const { idprivilege, ...update } = body;

        const [updatedRows] = await Privileges.update(update, {
            where: { idprivilege: idprivilege },
        });

        if (updatedRows > 0) {
            message = 'Privilegio modificado exitosamente.';
        } else {
            message = 'No se encontró un privilegio con ese ID';
        }
    } catch (error) {
        message = 'Error al modificar privilegio: ' + error.message;
    }
    res.json({
        privileges: message,
    });
};



const deletePrivileges = async (req, res) => {
    const { idprivilege } = req.body;
    let message = '';
    try {
        const rowsDeleted = await Privileges.destroy({ where: { idprivilege: idprivilege } });

        if (rowsDeleted > 0) {
            message = 'Privilegio eliminado exitosamente';
        } else {
            res.status(404).json({ error: 'No se encontró un permiso con ese ID' });
        }
    } catch (e) {
        res.status(500).json({ error: 'Error al eliminar privilegio', message: e.message });
    }
    res.json({
        privileges: message,
    });
};


module.exports = {
    putPrivileges,
    getPrivileges,
    postPrivileges,
    deletePrivileges
}
