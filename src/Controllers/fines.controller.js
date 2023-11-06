const Fine = require('../Models/fines.model');
const { response } = require('express');

const getFines = async (req, res = response) => {
    try {
        const fines = await Fine.findAll();

        console.log('multas obtenidas correctamente:', fines);

        res.json({
            fines,
        });
    } catch (error) {

        console.error('Error al obtener multas:', error);

        res.status(500).json({
            error: 'Error al obtener multas',
        });
    }
};

const postFines = async (req, res) => {
    let message = '';
    const body = req.body;
    try {
        await Fine.create(body);
        message = 'Multa Registrada Exitosamente';
    } catch (e) {
        message = e.message;
    }
    res.json({
        fines: message,
    });
};

const putFines = async (req, res = response) => {
    const body = req.body;
    let message = '';

    try {
        const { idfines, paymentproof, state } = body;

        const [updatedRows] = await Fine.update(
            {
                paymentproof: paymentproof,
                state: state,
            },
            {
                where: { idfines: idfines },
            }
        );

        if (updatedRows > 0) {
            message = 'multa modificada exitosamente.';
        } else {
            message = 'No se encontró una multa con ese ID';
        }
    } catch (error) {
        message = 'Error al modificar multa: ' + error.message;
    }
    res.json({
        message: message,
    });
};


const deleteFines = async (req, res = response) => {
    const body = req.body;
    let message = '';

    try {
        const { idfines } = body;

        const deleted = await Fine.destroy({
            where: { idfines: idfines },
        });

        if (deleted) {
            message = 'multa eliminada exitosamente.';
        } else {
            message = 'No se encontró un multa con ese ID';
        }
    } catch (error) {
        message = 'Error al eliminar multa: ' + error.message;
    }
    res.json({
        Fines: message,
    });
};

module.exports = {
    getFines,
    postFines,
    putFines,
    deleteFines,
};