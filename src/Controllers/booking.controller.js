const { response } = require('express');

const Booking = require('../Models/booking.model');
const UserModel = require('../Models/users.model');
const SpacesModel = require('../Models/spaces.model');
const ResidentModel = require('../Models/resident.model');
const ApartmentModel = require('../Models/apartment.model');
const Notification = require('../Models/notification.model');

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


const getOneBooking = async (req, res = response) => {

    const { idbooking } = req.params;

    try {
        const booking = await Booking.findOne({
            where: { idbooking: idbooking },
            include: [
                {
                    model: ResidentModel,
                    include: {
                        model: UserModel,
                    }
                },
                {
                    model: SpacesModel,
                }
            ]
        });

        res.json({
            booking,
        });
    } catch (error) {
        console.error('Error al obtener reserva.', error);
        res.status(500).json({
            error: 'Error al obtener reserva.',
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
        body.StartDateBooking = startDate.toISOString().split('T')[0];
    }

    console.log(body, 'datos de una reserva realizada');

    if (!body.idSpace || !body.idResident || !body.StartDateBooking || !body.StartTimeBooking || !body.EndTimeBooking || !body.amountPeople) {
        return res.status(400).json({
            error: 'Faltan datos necesarios para la reserva. Por favor, verifique los datos enviados.',
        });
    }

    try {
        const newBooking = await Booking.create(body);


        // Notification funtion

        const userLogged = await UserModel.findByPk(body.idResident);

        let notification;

        const spaces = await SpacesModel.findByPk(body.idSpace)

        const resident = await ResidentModel.findOne({
            where: { idResident: body.idResident },
            include: [{
                model: UserModel,
                as: "user"
            }],
        })

        console.log(resident, 'resident')

        let message = `
        Se registro una nueva reserva a nombre de ${resident.user.name} ${resident.user.lastname}
        ${spaces ? ` al ${spaces.spaceType} ${spaces.spaceName} el dia ${newBooking.StartDateBooking} y esta ${newBooking.status}` : ``}`

        if (body.idResident && userLogged) {
            notification = await Notification.create({
                iduser: body.idUserLogged,
                type: 'success',
                content: {
                    message: message,
                    information: { userLogged, booking: newBooking, resident: resident }
                },
                datetime: new Date()
            });
        }

        res.status(201).json({
            message: message,
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

    if (updateData.StartDateBooking) {
        const startDate = new Date(updateData.StartDateBooking);
        updateData.StartDateBooking = startDate.toISOString().split('T')[0];
    }

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


        // Notification funtion

        const userLogged = await UserModel.findByPk(req.body.idResident);

        let notification;

        const spaces = await SpacesModel.findByPk(req.body.idSpace)

        const resident = await ResidentModel.findOne({
            where: { idResident: req.body.idResident },
            include: [{
                model: UserModel,
                as: "user"
            }],
        })


        let message = `
        Se modifico el estado de la reserva ${resident.user.name} ${resident.user.lastname}
        ${spaces ? ` de ${spaces.spaceType} ${spaces.spaceName} ahora esta: ${updatedBooking.status}` : ``}`

        if (body.idResident && userLogged) {
            notification = await Notification.create({
                iduser: body.idUserLogged,
                type: updatedBooking.status == 'Cancelado' ? `danger` : 'warning' ,
                content: {
                    message: message,
                    information: { userLogged, booking: updatedBooking, resident: resident }
                },
                datetime: new Date()
            });
        }

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
    getOneBookingbySpaces,
    getOneBooking
}