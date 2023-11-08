const GuestIncome = require('../Models/guest.income.model');
const { response } = require('express');

const getGuestIncomeAll = async (req, res = response) => {
    try {
        const guestIncome = await GuestIncome.findAll();

        console.log('ingresos obtenidos correctamente:', guestIncome);

        res.json({
            guestIncome,
        });
    } catch (error) {

        console.error('Error al obtener ingresos:', error);

        res.status(500).json({
            error: 'Error al obtener ingresos',
        });
    }
};

const getGuestIncomeOne = async (req, res = response) => {
    try {
        const { idGuest_income } = req.params;

        const guestIncome = await GuestIncome.findOne({ where: { idGuest_income: idGuest_income } });

        if (!guestIncome) {
            return res.status(404).json({ error: 'No se encontró un ingreso con ese ID' });
        }

        res.json({
            guestIncome,
        });
    } catch (error) {
        console.error('Error al obtener ingreso:', error);
        res.status(500).json({
            error: 'Error al obtener ingreso',
        });
    }

}

const postGuestIncome = async (req, res) => {
    let message = '';
    const body = req.body;
    try {
        await GuestIncome.create(body);
        message = 'Ingreso Registrado Exitosamente';
    } catch (e) {
        message = e.message;
    }
    res.json({
        guestIncome: message,
    });
};

const putGuestIncome = async (req, res = response) => {
    const body = req.body;
    let message = '';
 
    try {
        const { idGuest_income, departureDate } = body;

        const [updatedRows] = await GuestIncome.update({
            departureDate: departureDate,
        }, {
            where: { idGuest_income: idGuest_income },
        });

        if (updatedRows > 0) {
            message = 'Ingreso modificado exitosamente.';
        } else {
            message = 'No se encontró un ingreso con ese ID';
        }
    } catch (error) {
        message = 'Error al modificar ingreso: ' + error.message;
    }
    res.json({
        guestIncome: message,
    });
};



module.exports = {
    getGuestIncomeAll,
    getGuestIncomeOne,
    postGuestIncome,
    putGuestIncome,
};