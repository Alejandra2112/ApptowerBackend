const {Router} = require('express');
const route = Router();
const {getBooking, postBooking, putBooking} = require('../Controllers/booking');

route.get('/', getBooking);
route.post('/', postBooking);
route.put('/', putBooking);

module.exports = route;