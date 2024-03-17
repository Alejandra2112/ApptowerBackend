const { check } = require('express-validator');
const ParkingSpacesModel = require('../Models/parking.spaces.model');
const Visitors = require('../Models/visitors.model');
const Guest_income = require('../Models/guest.income.model');

const postGuestIncomeValidations = [
  check('idParkingSpace').optional().isInt().withMessage('El espacio de parqueo es requerido')
  .custom(async (value) =>{
    if (value < 1) {
      throw new Error('El espacio de parqueo es requerido');
    }
    const parkingSpace = await ParkingSpacesModel.findOne({where: {idParkingSpace: value}});
    if (parkingSpace.parkingType == 'Private'){
      throw new Error('El espacio de parqueo es privado');
    }
      
    if (parkingSpace.status == 'Inactive'){
      throw new Error('El espacio de parqueo esta inactivo');
    }
    return true;
  }),
  check('idVisitor').isInt().withMessage('El visitante es requerido')
  .notEmpty().withMessage('El visitante es requerido')
  .custom(async (value) => {
    const visitor = await Visitors.findOne({
      where: { idVisitor: value },
    });

    if (!visitor) {
      throw new Error('El visitante no existe');
    }

    if (visitor.access == false) {
      throw new Error('El visitante no tiene acceso');
    }
    const existincome = await Guest_income.findOne({
      where: { idVisitor: value, departureDate: null },
    });

    if (existincome) {
      throw new Error('El visitante ya tiene un ingreso activo');
    }

    return true;
  })
  .isLength({min: 1}).withMessage('El visitante es requerido'),

  check('idApartment').optional().isInt().withMessage('El apartamento es requerido')
  .isLength({min: 1}).withMessage('El apartamento es requerido'),
  check('startingDate').notEmpty().withMessage('La fecha de inicio es requerida')
  .custom((value) => {
    if (isNaN(Date.parse(value))) {
      throw new Error(`La fecha del ingreso no puedeser anterior al dia actual: ${value}`);
    }
    const paymentDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (paymentDate < currentDate) {
      throw new Error(`La fecha de ingreso no puede ser anterior al día actual`);
    }
    return true;
  }),
  check('personAllowsAccess').isString().withMessage('La persona que permite el acceso es requerida')
  .notEmpty().withMessage('La persona que permite el acceso es requerida')
  .isLength({min: 3}).withMessage('La persona que permite el acceso es requerida'),
  check('idPakingSpace').optional().isInt().withMessage('El espacio de parqueo es requerido')
  .custom(async (value) =>{
    if (value < 1) {
      throw new Error('El espacio de parqueo es requerido');
    }
    const parkingSpace = await ParkingSpacesModel.findOne({where: {idParkingSpace: value}});
    if (parkingSpace.parkingType == 'Private'){
      throw new Error('El espacio de parqueo es privado');
    }
      
    if (parkingSpace.status == 'Inactive'){
      throw new Error('El espacio de parqueo esta ocupado');
    }
    return true;
  })
];

const putGuestIncomeValidations = [
  check('idGuest_income').isInt().withMessage('El ingreso de visitante es requerido')
  .notEmpty().withMessage('El ingreso de visitante es requerido'),
  check('idParkingSpace').optional().isInt().withMessage('El espacio de parqueo es requerido')
  .custom(async (value) =>{
    if (value < 1) {
      throw new Error('El espacio de parqueo es requerido');
    }
    const parkingSpace = await ParkingSpacesModel.findOne({where: {idParkingSpace: value}});
    if (parkingSpace.parkingType == 'Private'){
      throw new Error('El espacio de parqueo es privado');
    }
      
    if (parkingSpace.status !== 'Inactive'){
      throw new Error('El espacio de parqueo ya esta disponible');
    }
    return true;
  }),
  check('departureDate').custom((value) => {
    if (isNaN(Date.parse(value))) {
      throw new Error(`La fecha de salida debe ser valida, recibido: ${value}`);
    }
    const departureDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (departureDate < currentDate) {
      throw new Error(`La fecha de salida no puede ser anterior al día actual`);
    }
    return true;
  })
  .notEmpty().withMessage('La fecha de salida es requerida'),
];

module.exports = {
  postGuestIncomeValidations,
  putGuestIncomeValidations
};