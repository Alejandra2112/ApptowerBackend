const { response } = require('express');
const Notification = require('../Models/notification.model');
const UserModel = require('../Models/users.model');
const Guest_income = require('../Models/guest.income.model');
const Fines = require('../Models/fines.model');
const Booking = require('../Models/booking.model');
const ApartmentModel = require('../Models/apartment.model');

// Sockets
const notifications = async (socket, io) => {


    // Start emit notifications


    // Get all notifications in db

    const allNotifications = await Notification.findAll({
        order: [['createdAt', 'DESC']]
    });

    // Time to delete 

    const timeToDelete = new Date();
    timeToDelete.setDate(timeToDelete.getDate() - 1);

    // Filtrar las notificaciones que tienen más de una semana de antigüedad

    for (const notification of allNotifications) {

        let notificationCreatedAt = new Date(notification.createdAt);


        // console.log(notificationCreatedAt, timeToDelete, notificationCreatedAt > timeToDelete)

        if (notificationCreatedAt < timeToDelete) {
            await Notification.destroy({ where: { idnotification: notification.idnotification } });
        }
    }

    // Emitir notifications without delete

    const updatedNotifications = await Notification.findAll({
        order: [['createdAt', 'DESC']]
    });


    // Notifications to watchmans

    const notificationsPerWatchman = updatedNotifications.filter((notification) => {

        const notificationsFilteredToWatchmans =
            notification?.content?.information?.apartment ||
            notification?.content?.information?.fine ||
            notification?.content?.information?.guest_income

        console.log(notificationsFilteredToWatchmans?.length, 'apartmenNotifications')
        return notificationsFilteredToWatchmans !== undefined && notificationsFilteredToWatchmans !== null;

    });

    // Notifications to residents 

    const notificationsToResidents = updatedNotifications.filter((notification) => {

        const notificationsFilteredToResidents =
            notification?.content?.information?.booking ||
            notification?.content?.information?.apartment &&
            notification?.content?.information?.userLogged?.idrole === 1

        return notificationsFilteredToResidents !== undefined && notificationsFilteredToResidents !== null;

    });

    console.log(notificationsPerWatchman.length, 'notificationsPerWatchman')
    console.log(notificationsToResidents.length, 'notificationsToResidents')
    console.log(updatedNotifications.length, 'updatedNotifications')

    io.emit('resident-notifications', notificationsToResidents);
    io.emit('watchman-notifications', notificationsPerWatchman);
    io.emit('all-notifications', updatedNotifications);


    // End emit notifications






    // Funtion to see the notification with a click

    socket.on('seen-notification', async (id) => {

        console.log('data from seen-notification', id)

        const notification = await Notification.findByPk(id);

        console.log(notification, 'Notificacion buscada')

        const notificationUpdated = await notification.update({
            ...notification,
            seen: true
        })

        console.log(notificationUpdated, 'notification updated')

        const allNotifications = await Notification.findAll({
            order: [['createdAt', 'DESC']]
        });


        io.emit('all-notifications', allNotifications);


    })





    // socket.on('user-logied', async (data) => {
    //     if (data?.user?.data.idnotificationuser) {
    //         const user = await UserModel.findOne({ where: { data.idnotificationuser: data.user.data.idnotificationuser } });
    //         io.emit('user', user);
    //     } else {
    //         console.error('El data.idnotification de usuario es indefindata.idnotificationo.');
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

// const deleteNotification = async (req, res = response) => {
//     const body = req.body;
//     let message = '';

//     try {
//         const { data.idnotificationnotification } = body;

//         const deletedRows = await Notification.destroy({
//             where: { data.idnotificationnotification: data.idnotificationnotification },
//         });

//         if (deletedRows > 0) {
//             message = 'Notificación eliminada exitosamente.';
//         } else {
//             message = 'No se encontró una notificación con ese data.idnotification';
//         }
//     } catch (error) {
//         message = 'Error al eliminar notificación: ' + error.message;
//     }
//     res.json({
//         notification: message,
//     });
// }

module.exports = {
    getNotification,
    postNotification,
    // deleteNotification,
    notifications,
    dashboardInformation
}