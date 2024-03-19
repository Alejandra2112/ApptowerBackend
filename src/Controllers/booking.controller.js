const { response } = require('express');

const Booking = require('../Models/booking.model');
const UserModel = require('../Models/users.model');
const SpacesModel = require('../Models/spaces.model');
const ResidentModel = require('../Models/resident.model');
const ApartmentModel = require('../Models/apartment.model');
const Notification = require('../Models/notification.model');
const Mails = require('../Helpers/Mails');
const { GmailTransporter } = require('../Helpers/emailConfig');

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

    // console.log(body, 'datos de una reserva realizada');

    if (!body.idSpace || !body.idResident || !body.StartDateBooking || !body.StartTimeBooking || !body.EndTimeBooking || !body.amountPeople) {
        return res.status(400).json({
            error: 'Faltan datos necesarios para la reserva. Por favor, verifique los datos enviados.',
        });
    }

    try {
        const newBooking = await Booking.create(body);


        // Notification funtion


        let notification;

        const spaces = await SpacesModel.findByPk(body.idSpace)

        const resident = await ResidentModel.findOne({
            where: { idResident: body.idResident },
            include: [{
                model: UserModel,
                as: "user"
            }],
        })

        const userLogged = await UserModel.findByPk(resident.iduser);

        // console.log(resident, 'resident')

        const StartDateBooking = new Date(newBooking?.StartDateBooking).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });

        let message = `
        Se registro una nueva reserva al ${spaces.spaceName.toLowerCase()}
        ${spaces ? ` programada el dia ${StartDateBooking}, estado: ${newBooking.status}` : ``}`

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

        // Email funtion

        if (userLogged) {
            const mailToSend = Mails.bookingConfirmation(userLogged.name, userLogged.lastName, userLogged.email, newBooking, spaces);

            GmailTransporter.sendMail(mailToSend, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    res.status(500).json({ message: 'Error al enviar el correo' });
                } else {
                    console.log('Correo enviado:', info.response);
                    res.json({ message: 'Correo con código de recuperación enviado' });
                }
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


        let message = `Se modifico cronograma de reserva de la zona comun ${spaces.spaceName}`

        if (req.body.idResident && userLogged) {
            notification = await Notification.create({
                iduser: body.idUserLogged,
                type: updatedBooking.status == 'Cancelado' ? `danger` : 'success',
                content: {
                    message: message,
                    information: { userLogged, booking: updatedBooking, resident: resident }
                },
                datetime: new Date()
            });
        }


        // Email funtion

        if (userLogged) {
            const mailToSend = Mails.bookingConfirmation(userLogged.name, userLogged.lastname, userLogged.email, updatedBooking, spaces);

            GmailTransporter.sendMail(mailToSend, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    res.status(500).json({ message: 'Error al enviar el correo' });
                } else {
                    console.log('Correo enviado:', info.response);
                    res.json({ message: 'Correo con código de recuperación enviado' });
                }
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


const putStateBooking = async (req, res) => {
    const { idbooking, idUserLogged } = req.body;
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

        // Notification funtion

        const userLogged = await UserModel.findByPk(idUserLogged);

        let notification;

        const spaces = await SpacesModel.findByPk(updatedBooking.idSpace)

        const resident = await ResidentModel.findOne({
            where: { idResident: updatedBooking.idResident },
            include: [{
                model: UserModel,
                as: "user"
            }],
        })

        const StartDateBooking = new Date(updatedBooking?.StartDateBooking).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });

        let message = `
        Se ${updatedBooking.status == 'Cancelado' ? 'cancelo' : 'aprobo'} la reserva de ${spaces.spaceName} 
        programada el dia ${StartDateBooking} estado: ${updatedBooking.status}`

        if (idUserLogged && userLogged) {
            notification = await Notification.create({
                iduser: idUserLogged,
                type: updatedBooking.status == 'Cancelado' ? `danger` : 'warning',
                content: {
                    message: message,
                    information: { userLogged, booking: updatedBooking, resident: resident }
                },
                datetime: new Date()
            });
        }

        // Email funtion

        if (userLogged) {
            const mailToSend = Mails.bookingStatus(userLogged.name, userLogged.lastName, userLogged.email, updatedBooking, spaces);

            GmailTransporter.sendMail(mailToSend, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    res.status(500).json({ message: 'Error al enviar el correo' });
                } else {
                    console.log('Correo enviado:', info.response);
                    res.json({ message: 'Correo con código de recuperación enviado' });
                }
            });
        }

        res.json({
            message: 'Estado de reserva modificado exitosamente.',
            updatedRows: updatedRows,
            updatedBooking: updatedBooking,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al modificar estado de reserva: ' + error.message,
        });
    }
}

module.exports = {
    getBooking,
    postBooking,
    putBooking,
    getOneBookingbySpaces,
    getOneBooking,
    putStateBooking
}