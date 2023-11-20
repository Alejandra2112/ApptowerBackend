const { Router } = require('express');
const route = Router();

const { getGuestIncomeVehicle, postGuestIncomeVehicle, putGuestIncomeVehicle } = require('../controllers/guestincomevehicle.controller');

route.get('/', getGuestIncomeVehicle);
route.post('/', postGuestIncomeVehicle);
route.put('/:id', putGuestIncomeVehicle);

module.exports = route;