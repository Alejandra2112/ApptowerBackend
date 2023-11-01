const Taxe = require('../Models/fines.model');
const { response } = require('express');

const getFines = async (req, res = response) => {
    try {
        const taxes = await Taxe.findAll();

        console.log('impuestos obtenidos correctamente:', taxes);

        res.json({
            taxes,
        });
    } catch (error) {

        console.error('Error al obtener impuestos:', error);

        res.status(500).json({
            error: 'Error al obtener impuestos',
        });
    }
};

const postFines = async (req, res) => {
    let message = '';
    const body = req.body;
    try {
        await Taxe.create(body);
        message = 'Impuesto Registrado Exitosamente';
    } catch (e) {
        message = e.message;
    }
    res.json({
        taxes: message,
    });
};

const putFines = async (req, res = response) => {
    const body = req.body;
    let message = '';

    try {
        const { idTax, ...update } = body;

        const [updatedRows] = await Taxe.update(update, {
            where: { idTax: idTax },
        });

        if (updatedRows > 0) {
            message = 'Impuesto modificado exitosamente.';
        } else {
            message = 'No se encontró un impuesto con ese ID';
        }
    } catch (error) {
        message = 'Error al modificar impuesto: ' + error.message;
    }
    res.json({
        taxes: message,
    });
};

const deleteFines = async (req, res = response) => {
    const body = req.body;
    let message = '';

    try {
        const { idTax } = body;

        const deleted = await Taxe.destroy({
            where: { idTax: idTax },
        });

        if (deleted) {
            message = 'Impuesto eliminado exitosamente.';
        } else {
            message = 'No se encontró un impuesto con ese ID';
        }
    } catch (error) {
        message = 'Error al eliminar impuesto: ' + error.message;
    }
    res.json({
        taxes: message,
    });
};

module.exports = {
    getFines,
    postFines,
    putFines,
    deleteFines,
};