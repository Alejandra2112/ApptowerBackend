const { response } = require('express');

const Booking = require('../Models/booking.model');
const UserModel = require('../Models/users.model');
const SpacesModel = require('../Models/spaces.model');
const ResidentModel = require('../Models/resident.model');

const getBooking = async (req, res = response) => {
    try {
        const booking = await Booking.findAll({
            include: [
                {
                    model: ResidentModel,
                    attributes: ['idResident', 'status'],
                    include: {
                        model: UserModel,
                        attributes: ['iduser', 'name', 'lastName', 'email']
                    }
                },
                {
                    model: SpacesModel,
                    attributes: ['idSpace', 'spaceName', 'area', 'capacity', 'status', 'image']
                }
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
        const booking = await Booking.findOne({
            where: { idSpace: idSpace },
            include: [
                {
                    model: ResidentModel,
                    attributes: ['idResident', 'status'],
                    include: {
                        model: UserModel,
                        attributes: ['iduser', 'name', 'lastName', 'email']
                    }
                },
                {
                    model: SpacesModel,
                    attributes: ['idSpace', 'spaceName', 'area', 'capacity', 'status', 'image']
                }
            ]
        });

        if (!booking) {
            return res.status(404).json({
                error: 'No se encontró ninguna reserva para el espacio especificado',
            });
        }

        res.json({
            booking,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener la reserva',
        });
    }
}


const postBooking = async (req, res) => {
    const body = req.body;



    if (body.StartDateBooking) {
        const startDate = new Date(body.StartDateBooking);
        body.StartDateBooking = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    }

    console.log(body, 'datos de una reserva realizada');

    if (!body.idSpace || !body.idResident || !body.StartDateBooking || !body.StartTimeBooking || !body.EndDateBooking || !body.EndTimeBooking || !body.amountPeople) {
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
    const { idbooking } = req.body;
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

        const updatedBooking = await Booking.findOne({ where: { idbooking: idbooking } });

        res.json({
            message: 'Reserva modificada exitosamente.',
            updatedRows: updatedRows,
            updatedBooking: updatedBooking,
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