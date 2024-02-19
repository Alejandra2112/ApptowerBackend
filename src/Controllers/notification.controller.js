const { response } = require('express');
const Notification = require('../Models/notification.model');
const { DateSchema } = require('yup');
const { ISO_8601 } = require('moment-timezone');
const UserModel = require('../Models/users.model');

// Sockets

const notifications = async (socket, io) => {



    socket.on('response-connection', (mensaje) => {



        socket.emit('response-servidor', `Mensaje recibido por el servidor ${mensaje}`);

    });

    const users = await UserModel.findAll(
        {
            where: { status: 'Activo' }
        }
    )

    io.emit('active-users', { users })

}

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
    notifications
}