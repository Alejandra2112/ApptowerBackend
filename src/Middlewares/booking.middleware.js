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

            const bookingStartTime = moment(value, 'HH:mm'); // Crear objeto moment con la hora de inicio
            const bookingEndTime = moment(req.body.EndTimeBooking, 'HH:mm'); // Crear objeto moment con la hora de fin
            const spaceOpeningTime = moment(space.openingTime, 'HH:mm'); // Crear objeto moment con la hora de apertura del espacio
            const spaceClosingTime = moment(space.closingTime, 'HH:mm'); // Crear objeto moment con la hora de cierre del espacio

            const bookingDuration = moment.duration(bookingEndTime.diff(bookingStartTime)).asMinutes();

            let spaceDuration;
            if (spaceClosingTime.isBefore(spaceOpeningTime)) {
                spaceDuration = moment.duration(spaceClosingTime.add(1, 'days').diff(spaceOpeningTime)).asMinutes();
            } else {
                spaceDuration = moment.duration(spaceClosingTime.diff(spaceOpeningTime)).asMinutes();
            }

            if (bookingDuration > spaceDuration) {
                throw new Error('El horario total de la reserva no puede ser mayor que el horario del espacio disponible.');
            }

            return true;
        }),

    // //este 
    // .custom(async (StartTimeBooking, { req }) => {
    //     const moment = require('moment');
    //     const bookingStartDate = moment(new Date(req.body.StartDateBooking)).format('YYYY-MM-DD');
    //     const bookingStartTime = moment(`${bookingStartDate} ${StartTimeBooking}`, 'YYYY-MM-DD HH:mm');
    //     const bookingEndTime = moment(`${bookingStartDate} ${req.body.EndTimeBooking}`, 'YYYY-MM-DD HH:mm');

    //     const existingBookings = await BookingModel.findAll({
    //         where: {
    //             idSpace: req.body.idSpace,
    //             [Op.or]: [
    //                 {
    //                     [Op.and]: [
    //                         {
    //                             StartTimeBooking: {
    //                                 [Op.lte]: bookingEndTime.format('HH:mm:ss')
    //                             }
    //                         },
    //                         {
    //                             EndTimeBooking: {
    //                                 [Op.gte]: bookingStartTime.format('HH:mm:ss')
    //                             }
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     });

    //     if (existingBookings && existingBookings.length > 0) {
    //         throw new Error('Ya existe una reserva para este espacio en el mismo horario.');
    //     }

    //     return true;
    // }),

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
        // .isTime().withMessage('Hora de inicio de la reserva es requerida.')
        // .bail()
        .custom(async (StartTimeBooking, { req }) => {
            console.log("StartTimeBooking", StartTimeBooking)
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

            const bookingStartTime = moment(value, 'HH:mm'); // Crear objeto moment con la hora de inicio
            const bookingEndTime = moment(req.body.EndTimeBooking, 'HH:mm'); // Crear objeto moment con la hora de fin
            const spaceOpeningTime = moment(space.openingTime, 'HH:mm'); // Crear objeto moment con la hora de apertura del espacio
            const spaceClosingTime = moment(space.closingTime, 'HH:mm'); // Crear objeto moment con la hora de cierre del espacio

            const bookingDuration = moment.duration(bookingEndTime.diff(bookingStartTime)).asMinutes();

            let spaceDuration;
            if (spaceClosingTime.isBefore(spaceOpeningTime)) {
                spaceDuration = moment.duration(spaceClosingTime.add(1, 'days').diff(spaceOpeningTime)).asMinutes();
            } else {
                spaceDuration = moment.duration(spaceClosingTime.diff(spaceOpeningTime)).asMinutes();
            }

            if (bookingDuration > spaceDuration) {
                throw new Error('El horario total de la reserva no puede ser mayor que el horario del espacio disponible.');
            }

            return true;
        }),

    // //este 
    // .custom(async (StartTimeBooking, { req }) => {
    //     const moment = require('moment');
    //     const bookingStartDate = moment(new Date(req.body.StartDateBooking)).format('YYYY-MM-DD');
    //     const bookingStartTime = moment(`${bookingStartDate} ${StartTimeBooking}`, 'YYYY-MM-DD HH:mm');
    //     const bookingEndTime = moment(`${bookingStartDate} ${req.body.EndTimeBooking}`, 'YYYY-MM-DD HH:mm');

    //     const existingBookings = await BookingModel.findAll({
    //         where: {
    //             idSpace: req.body.idSpace,
    //             [Op.or]: [
    //                 {
    //                     [Op.and]: [
    //                         {
    //                             StartTimeBooking: {
    //                                 [Op.lte]: bookingEndTime.format('HH:mm:ss')
    //                             }
    //                         },
    //                         {
    //                             EndTimeBooking: {
    //                                 [Op.gte]: bookingStartTime.format('HH:mm:ss')
    //                             }
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     });

    //     if (existingBookings && existingBookings.length > 0) {
    //         throw new Error('Ya existe una reserva para este espacio en el mismo horario.');
    //     }

    //     return true;
    // }),

    check('EndTimeBooking')
        // .isTime().withMessage('Hora fin de la reserva es requerida.')
        // .bail()
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
    check('status').notEmpty().withMessage('El estado de la reserva es requerido.'),

];



module.exports = {
    bookingValidationPost,
    bookingValidationPut
}