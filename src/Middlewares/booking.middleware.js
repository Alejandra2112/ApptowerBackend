const { check, validationResult } = require('express-validator');
const moment = require('moment');
const SpacesModel = require('../Models/spaces.model');
const BookingModel = require('../Models/booking.model')
const { Op } = require('sequelize');
const ResidentModel = require('../Models/resident.model');
const UserModel = require('../Models/users.model');

const bookingValidationPost = [

    check('idSpace').isNumeric().withMessage('La zona común es requerido.')
        .custom(async (value, { req }) => {

            const space = await SpacesModel.findOne({ where: { idSpace: value, status: 'Inactive' } })

            if (space) throw new Error('Hora inicio de la reserva es antes de la hora de apertura del espacio.');

            return true
        }),

    check('idResident').isNumeric().withMessage('El residente es requerido.')
        .custom(async (value, { req }) => {

            const resident = await ResidentModel.findOne({
                where: { idResident: value, status: 'Inactive' },
                include: [{

                    model: UserModel,
                    as: 'user',
                    where: { status: 'Inactive' }
                }]
            })

            if (resident) throw new Error('El residente y el usuario del residente debe estar activo.');

            return true
        }),

    check('StartDateBooking').notEmpty().withMessage('La fecha de inicio de la reserva es requerida.')
        .custom(async (value, { req }) => {

            const startDate = new Date(value);
            const currentDate = new Date();

            if (startDate.toDateString() === currentDate.toDateString()) {
                throw new Error('La fecha de inicio de la reserva no puede ser para el mismo día.');
            }

            const nextDay = new Date(currentDate);
            nextDay.setDate(currentDate.getDate() + 1);

            if (startDate.toDateString() === nextDay.toDateString()) {
                throw new Error('La fecha de inicio de la reserva no puede ser para el día siguiente.');
            }

            const oneMonthLater = new Date(currentDate);
            oneMonthLater.setMonth(currentDate.getMonth() + 1);

            if (startDate > oneMonthLater) {
                throw new Error('La fecha de inicio de la reserva no puede ser superior a un mes.');
            }

            return true;
        }),

    check('StartTimeBooking')
        .isTime().withMessage('Hora de inicio de la reserva es requerida.')
        .bail()
        .custom(async (StartTimeBooking, { req }) => {
            const space = await SpacesModel.findByPk(req.body.idSpace);
            if (space) {
                const bookingStartTime = moment(StartTimeBooking, 'HH:mm');
                const spaceStartHour = moment(space.openingTime, 'HH:mm');
                const spaceEndHour = moment(space.closingTime, 'HH:mm');

                if (bookingStartTime.isBefore(spaceStartHour)) {
                    throw new Error('Hora inicio de la reserva es antes de la hora de apertura del espacio.');
                }

                if (bookingStartTime.isSameOrAfter(spaceEndHour)) {
                    throw new Error('Hora inicio de la reserva es igual o después de la hora de cierre del espacio.');
                }
            }
        })
        .custom(async (value, { req }) => {

            const space = await SpacesModel.findByPk(req.body.idSpace)

            const startTime = new Date(`01/01/2024 ${value}`); // Crear objeto Date con la fecha de reserva y hora de inicio
            const endTime = new Date(`01/01/2024 ${req.body.EndTimeBooking}`); // Crear objeto Date con la fecha de reserva y hora de fin
            const openingTime = new Date(`01/01/2024 ${space.openingTime}`); // Crear objeto Date con la hora de apertura del espacio
            const closingTime = new Date(`01/01/2024 ${space.closingTime}`); // Crear objeto Date con la hora de cierre del espacio

            const bookingDuration = endTime - startTime;

            const spaceDuration = closingTime - openingTime;

            if (bookingDuration > spaceDuration) {
                throw new Error('El horario total de la reserva no puede ser mayor que el horario del espacio disponible.');
            }

            return true;
        }),

    check('EndTimeBooking')
        .isTime().withMessage('Hora fin de la reserva es requerida.')
        .bail()
        .custom(async (EndTimeBooking, { req }) => {
            const space = await SpacesModel.findByPk(req.body.idSpace);
            const bookingStartTime = moment(req.body.StartTimeBooking, 'HH:mm');
            const bookingEndTime = moment(EndTimeBooking, 'HH:mm');
            const spaceEndHour = moment(space.closingTime, 'HH:mm');

            if (bookingEndTime.diff(bookingStartTime, 'minutes') < 60) {
                throw new Error('La reserva debe ser de al menos una hora.');
            }

            if (bookingEndTime.isBefore(bookingStartTime)) {
                throw new Error('Hora fin de la reserva es antes de la hora de inicio de la reserva.');
            }

            if (bookingEndTime.isAfter(spaceEndHour)) {
                throw new Error('Hora fin de la reserva es después de la hora de cierre del espacio.');
            }
        }),

    check('amountPeople').isNumeric().withMessage('La cantidad de personas debe ser un número.')
        .bail()
        .custom(async (amountPeople, { req }) => {
            const space = await SpacesModel.findByPk(req.body.idSpace);
            if (space && amountPeople > space.capacity) {
                throw new Error('La cantidad de personas supera la capacidad del espacio.');
            }
        }),

];


const bookingValidationPut = [



    check('idSpace').isNumeric().withMessage('La zona común es requerido.'),

    check('idResident').isNumeric().withMessage('El residente es requerido'),

    check('StartDateBooking')
        .notEmpty().withMessage('La fecha de inicio de la reserva es requerida.')
        .bail()
        .custom(async (StartDateBooking, { req }) => {
            const existingBooking = await BookingModel.findOne({
                where: {
                    idSpace: req.body.idSpace,
                    StartDateBooking: StartDateBooking,
                    idbooking: { [Op.ne]: req.body.idbooking }
                }
            });
            if (existingBooking) {
                throw new Error('La fecha seleccionada ya está ocupada.');
            }
        }),

    check('StartTimeBooking')
        .notEmpty().withMessage('Hora de inicio de la reserva es requerida.')
        .bail()
        .custom(async (StartTimeBooking, { req }) => {
            const space = await SpacesModel.findByPk(req.body.idSpace);
            const bookingStartTime = moment(StartTimeBooking, 'HH:mm');
            const bookingEndTime = moment(req.body.EndTimeBooking, 'HH:mm');

            if (space) {
                const spaceStartHour = moment(space.openingTime, 'HH:mm');
                const spaceEndHour = moment(space.closingTime, 'HH:mm');

                if (bookingStartTime.isBefore(spaceStartHour)) {
                    throw new Error('Hora inicio de la reserva es antes de la hora de apertura del espacio.');
                }

                if (bookingStartTime.isSameOrAfter(spaceEndHour)) {
                    throw new Error('Hora inicio de la reserva es igual o después de la hora de cierre del espacio.');
                }
            }

            const existingBooking = await BookingModel.findOne({
                where: {
                    idSpace: req.body.idSpace,
                    StartDateBooking: req.body.StartDateBooking,
                    [Op.or]: [
                        {
                            StartTimeBooking: {
                                [Op.between]: [bookingStartTime.format('HH:mm'), bookingEndTime.format('HH:mm')]
                            }
                        },
                        {
                            EndTimeBooking: {
                                [Op.between]: [bookingStartTime.format('HH:mm'), bookingEndTime.format('HH:mm')]
                            }
                        }
                    ],
                    idbooking: { [Op.ne]: req.body.idbooking }
                }
            });
            if (existingBooking) {
                throw new Error('La hora de inicio de la reserva se superpone con otra reserva existente.');
            }
        }),

    check('EndTimeBooking')
        .notEmpty().withMessage('Hora fin de la reserva es requerida.')
        .bail()
        .custom(async (EndTimeBooking, { req }) => {
            const space = await SpacesModel.findByPk(req.body.idSpace);
            const spaceEndHour = moment(space.closingTime, 'HH:mm');
            const bookingStartTime = moment(req.body.StartTimeBooking, 'HH:mm');
            const bookingEndTime = moment(EndTimeBooking, 'HH:mm');

            const minTime = moment(space.minTime, 'HH:mm');
            const maxTime = moment(space.maxTime, 'HH:mm');

            if (bookingEndTime.diff(bookingStartTime, 'minutes') < 60) {
                throw new Error('La reserva debe ser de al menos una hora.');
            }

            if (bookingEndTime.isBefore(bookingStartTime)) {
                throw new Error('Hora fin de la reserva es antes de la hora de inicio de la reserva.');
            }

            if (bookingEndTime.isAfter(spaceEndHour)) {
                throw new Error('Hora fin de la reserva es después de la hora de cierre del espacio.');
            }

            const existingBooking = await BookingModel.findOne({
                where: {
                    idSpace: req.body.idSpace,
                    StartDateBooking: req.body.StartDateBooking,
                    EndTimeBooking: {
                        [Op.between]: [bookingStartTime.format('HH:mm'), bookingEndTime.format('HH:mm')]
                    },
                    idbooking: { [Op.ne]: req.body.idbooking }
                }
            });
            if (existingBooking) {
                throw new Error('La hora de fin de la reserva se superpone con otra reserva existente.');
            }

            if (bookingEndTime.isAfter(maxTime)) {
                throw new Error(`La hora de fin de la reserva no puede ser después de las ${maxTime.format('HH:mm')}.`);
            }

            if (bookingEndTime.isBefore(minTime)) {
                throw new Error(`La hora de fin de la reserva no puede ser antes de las ${minTime.format('HH:mm')}.`);
            }
        }),




    check('amountPeople').isNumeric().withMessage('La cantidad de personas debe ser un número.')
        .bail()
        .custom(async (amountPeople, { req }) => {
            const space = await SpacesModel.findByPk(req.body.idSpace);
            if (space && amountPeople > space.capacity) {
                throw new Error('La cantidad de personas supera la capacidad del espacio.');
            }
        }),
    check('status').notEmpty().withMessage('El estado de la reserva es requerido.'),

];



module.exports = {
    bookingValidationPost,
    bookingValidationPut
}