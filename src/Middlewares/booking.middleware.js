const { check, validationResult } = require('express-validator');
const moment = require('moment');
const SpacesModel = require('../Models/spaces.model');
const BookingModel = require('../Models/booking.model')
const { Op } = require('sequelize');

const bookingValidationPost = [

    check('idSpace').isNumeric().withMessage('La zona común es requerido.'),

    check('idResident').isNumeric().withMessage('El residente es requerido.'),

    check('StartDateBooking').notEmpty().withMessage('La fecha de inicio de la reserva es requerida.'),

    check('StartTimeBooking')
        .isTime().withMessage('Hora de inicio de la reserva es requerida.')
        .bail()
        .custom(async (StartTimeBooking, { req }) => {
            const space = await SpacesModel.findByPk(req.body.idSpace);
            if (space) {
                const bookingStartTime = moment(StartTimeBooking, 'HH:mm');
                const spaceStartHour = moment(space.schedule.startHour, 'HH:mm');
                const spaceEndHour = moment(space.schedule.endHour, 'HH:mm');

                if (bookingStartTime.isBefore(spaceStartHour)) {
                    throw new Error('Hora inicio de la reserva es antes de la hora de apertura del espacio.');
                }

                if (bookingStartTime.isSameOrAfter(spaceEndHour)) {
                    throw new Error('Hora inicio de la reserva es igual o después de la hora de cierre del espacio.');
                }
            }
        }),

    check('EndTimeBooking')
        .isTime().withMessage('Hora fin de la reserva es requerida.')
        .bail()
        .custom(async (EndTimeBooking, { req }) => {
            const space = await SpacesModel.findByPk(req.body.idSpace);
            const bookingStartTime = moment(req.body.StartTimeBooking, 'HH:mm');
            const bookingEndTime = moment(EndTimeBooking, 'HH:mm');
            const spaceEndHour = moment(space.schedule.endHour, 'HH:mm');

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
                const spaceStartHour = moment(space.schedule.startHour, 'HH:mm');
                const spaceEndHour = moment(space.schedule.endHour, 'HH:mm');

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
            const spaceEndHour = moment(space.schedule.endHour, 'HH:mm');
            const bookingStartTime = moment(req.body.StartTimeBooking, 'HH:mm');
            const bookingEndTime = moment(EndTimeBooking, 'HH:mm');

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