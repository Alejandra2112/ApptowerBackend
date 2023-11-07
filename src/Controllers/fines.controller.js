const Fines = require('../Models/fines.model');
const { response } = require('express');

const getFines = async (req, res = response) => {
    try {
        const fines = await Fines.findAll();

        console.log('Multas obtenidas correctamente:', fines);

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
        await Fines.create(body);
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
        const { idfines, state, paymentproof } = body;

        const [updatedRows] = await Fines.update({
            state: state,
            paymentproof: paymentproof
        
        }, {
            where: { idfines: idfines },
        });

        if (updatedRows > 0) {
            message = 'Multa modificada exitosamente.';
        } else {
            message = 'No se encontró una multa con ese ID';
        }
    } catch (error) {
        message = 'Error al modificar multa: ' + error.message;
    }
    res.json({
        fines: message,
    });
};


module.exports = {
    getFines,
    postFines,
    putFines,
};