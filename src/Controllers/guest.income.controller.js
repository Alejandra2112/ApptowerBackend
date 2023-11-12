const GuestIncome = require('../Models/guest.income.model');
const { response } = require('express');

const getGuestIncome = async (req, res = response) => {
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
    getGuestIncome,
    postGuestIncome,
    putGuestIncome,
};