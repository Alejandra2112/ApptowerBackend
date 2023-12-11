const { Router } = require('express');
const route = Router();

const {
    getGuestIncomeParking,
    getGuestIncomeParkingOne,
    getGuestIncomeParkingByApartment,
    postGuestIncomeParking,
    putGuestIncomeParking,
} = require('../Controllers/guestincomeParking.controller');

route.get('/', getGuestIncomeParking);
route.get('/:id', getGuestIncomeParkingOne);
route.get('/byApartment/:idApartment', getGuestIncomeParkingByApartment);
route.post('/', postGuestIncomeParking);
route.put('/:id', putGuestIncomeParking);

module.exports = route;