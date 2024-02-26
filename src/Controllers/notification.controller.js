const { response } = require('express');
const Notification = require('../Models/notification.model');
const UserModel = require('../Models/users.model');
const Guest_income = require('../Models/guest.income.model');
const Fines = require('../Models/fines.model');
const Booking = require('../Models/booking.model');
const ApartmentModel = require('../Models/apartment.model');

// Sockets
const notifications = async (socket, io) => {

    
    const allNotifications = await Notification.findAll({
        order: [['createdAt', 'DESC']]
    });

    io.emit('notifications-user', allNotifications);

    

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
    
    
        io.emit('notifications-user', allNotifications);


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