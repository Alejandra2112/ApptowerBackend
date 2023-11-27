const {Router} = require('express');
const route = Router();
const {getBooking, postBooking, putBooking, getOneBookingbySpaces} = require('../Controllers/booking.controller');

route.get('/', getBooking);
route.post('/', postBooking);
route.put('/', putBooking);
route.get('/:idSpace', getOneBookingbySpaces);

module.exports = route;