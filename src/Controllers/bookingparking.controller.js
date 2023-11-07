const {response} = require('express');
const Bookingparking = require('../Models/bookingparking.model');

const getBookingparking = async (req, res = response) => {
    try {
        const bookingparking = await Bookingparking.findAll();

        res.json({
            bookingparking,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener reservas',
        });
    }
}

const postBookingparking = async (req, res) => {
    let message = '';
    const body = req.body;
    try {
        await Bookingparking.create(body);
        message = 'Reserva Registrada Exitosamente';        
    } catch (error) {
        message = error.message;
    }
    res.json({
        bookingparking: message,
    });
}

const putBookingparking = async (req, res = response) => {
    const body = req.body;
    let message = '';

    try {
        const { idbookingparking, Updating } = body;

        const [updatedRows] = await Bookingparking.update(Updating, {
            where: { idbookingparking: idbookingparking },
        });

        if (updatedRows > 0) {
            message = 'Reserva modificada exitosamente.';
        } else {
            message = 'No se encontró una reserva con ese ID';
        }
    } catch (error) {
        message = 'Error al modificar reserva: ' + error.message;
    }
    res.json({
        bookingparking: message,
    });
}

module.exports = {
    getBookingparking,
    postBookingparking,
    putBookingparking,
}