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
route.get('/:idGuestIncomeParking', getGuestIncomeParkingOne);
route.get('/byApartment/:idApartment', getGuestIncomeParkingByApartment);
route.post('/', postGuestIncomeParking);
route.put('/:idGuestIncomeParking', putGuestIncomeParking);

module.exports = route;