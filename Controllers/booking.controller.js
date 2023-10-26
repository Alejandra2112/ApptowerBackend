const { response } = require('express');

const Booking = require('../Models/booking.model');
const e = require('express');

const getBooking = async (req, res = response) => {
    try {
        const booking = await Booking.findAll();

        res.json({
            booking,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener reservas',
        });
    }
}
const postBooking = async (req, res) => {
    let message = '';
    const body = req.body;
    try {
        await Booking.create(body);
        message = 'Reserva Registrada Exitosamente';        
    } catch (error) {
        message = error.message;
    }
    res.json({
        booking: message,
    });
}
const putBooking = async (req, res = response) => {
    const body = req.body;
    let message = '';

    try {
        const { idbooking, Updating } = body;

        const [updatedRows] = await Booking.update(Updating, {
            where: { idbooking: idbooking },
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
        booking: message,
    });
}

module.exports = {
    getBooking,
    postBooking,
    putBooking,
};