const Fines = require('../Models/fines.model');
const { response } = require('express');

const getFinesAll = async (req, res = response) => {
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

const getFinesOne = async (req, res = response) => {
    try {
        const { idfines } = req.params;

        const fines = await Fines.findOne({ where: { idfines: idfines } });

        if (!fines) {
            return res.status(404).json({ error: 'No se encontró una multa con ese ID' });
        }

        res.json({
            fines,
        });
    } catch (error) {
        console.error('Error al obtener multa:', error);
        res.status(500).json({
            error: 'Error al obtener multa',
        });
    }

}

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
    getFinesAll,
    getFinesOne,
    postFines,
    putFines,
};