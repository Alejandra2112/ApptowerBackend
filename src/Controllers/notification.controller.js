const { response } = require('express');
const Notification = require('../Models/notification.model');
const UserModel = require('../Models/users.model');
const Guest_income = require('../Models/guest.income.model');
const Fines = require('../Models/fines.model');
const Booking = require('../Models/booking.model');
const ApartmentModel = require('../Models/apartment.model');

// Sockets
const notifications = async (socket, io) => {


    socket.on('user-id', async (id) => {

        console.log('id desde e, front ', id)

        const notificacionesByUser = await Notification.findAll({ 
            where: { iduser: id },
            order: [['createdAt', 'DESC']]
        });

        console.log(notificacionesByUser, 'Notificaciones de juario')

        
        io.emit('notifications-user', notificacionesByUser);



    })
    // socket.on('user-logied', async (data) => {
    //     if (data?.user?.iduser) {
    //         const user = await UserModel.findOne({ where: { iduser: data.user.iduser } });
    //         io.emit('user', user);
    //     } else {
    //         console.error('El ID de usuario es indefinido.');
    //     }
    // });


};


const dashboardInformation = async (socket, io) => {


    const guestIncome = await Guest_income.findAll();
    const fines = await Fines.findAll();
    const bookings = await Booking.findAll();
    const apartments = await ApartmentModel.findAll();
    const users = await UserModel.findAll()

    const data = {
        guestIncomes: guestIncome,
        fines: fines,
        bookings: bookings,
        apartments: apartments,
        users: users
    };

    socket.emit('dashboard-information', data);
    socket.on('dashboard-information', data => {

        console.log('data from dashboard', data)
    });


};



// HTTP

const getNotification = async (req, res = response) => {
    try {
        const notification = await Notification.findAll();

        res.json({
            notification,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener notificaciones',
        });
    }
}

const postNotification = async (req, res) => {
    let message = '';
    const body = req.body;
    try {
        await Notification.create(body);
        message = 'Notificación Registrada Exitosamente';
    } catch (error) {
        message = error.message;
    }
    res.json({
        notification: message,
    });
}

const deleteNotification = async (req, res = response) => {
    const body = req.body;
    let message = '';

    try {
        const { idnotification } = body;

        const deletedRows = await Notification.destroy({
            where: { idnotification: idnotification },
        });

        if (deletedRows > 0) {
            message = 'Notificación eliminada exitosamente.';
        } else {
            message = 'No se encontró una notificación con ese ID';
        }
    } catch (error) {
        message = 'Error al eliminar notificación: ' + error.message;
    }
    res.json({
        notification: message,
    });
}

module.exports = {
    getNotification,
    postNotification,
    deleteNotification,
    notifications,
    dashboardInformation
}