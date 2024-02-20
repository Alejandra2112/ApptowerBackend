const { response } = require('express');

const Booking = require('../Models/booking.model');
const UserModel = require('../Models/users.model');
const SpacesModel = require('../Models/spaces.model');

const getBooking = async (req, res = response) => {
    try {
        const booking = await Booking.findAll({
            include: [
                { model: UserModel, attributes: ['name', 'lastname', 'email'] },
                { model: SpacesModel, attributes: ['spaceName', 'spaceType', 'capacity'] }
            ]
        });


        res.json({
            booking,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener reservas',
        });
    }
}
const getOneBookingbySpaces = async (req, res = response) => {
    const { idSpace } = req.params;

    try {
        const booking = await Booking.findAll({
            where: { idSpace: idSpace },
            include: [
                { model: UserModel, attributes: ['name', 'lastname', 'email'] },
                { model: SpacesModel, attributes: ['spaceName', 'spaceType','capacity'] }
            ]
        });

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
    const body = req.body;

    if (!body.idSpace || !body.iduser || !body.bookingdate || !body.amount) {
        return res.status(400).json({
            error: 'Faltan datos necesarios para la reserva. Por favor, verifique los datos enviados.',
        });
    }

    try {
        const newBooking = await Booking.create(body);

        res.status(201).json({
            message: 'Reserva Registrada Exitosamente',
            bookingId: newBooking.idbooking, 
            bookingDetails: newBooking, 
        });
    } catch (error) {
       
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: 'La reserva no pudo ser creada debido a un conflicto de datos.',
            });
        }

        
        res.status(500).json({
            error: 'Error al registrar la reserva: ' + error.message,
        });
    }
};

const putBooking = async (req, res) => {
    const { idbooking } = req.params;
    const updateData = req.body;

    
    if (!idbooking) {
        return res.status(400).json({
            error: 'ID de reserva no proporcionado.',
        });
    }

    try {
        
        const [updatedRows] = await Booking.update(updateData, {
            where: { idbooking: idbooking },
        });

        if (updatedRows === 0) {
        
            return res.status(404).json({
                error: 'No se encontró una reserva con ese ID.',
            });
        }

        
        res.json({
            message: 'Reserva modificada exitosamente.',
            updatedRows: updatedRows,
        });
    } catch (error) {
        
        res.status(500).json({
            error: 'Error al modificar reserva: ' + error.message,
        });
    }
};

module.exports = {
    getBooking,
    postBooking,
    putBooking,
    getOneBookingbySpaces
}