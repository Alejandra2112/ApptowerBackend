const {Router} = require('express');
const router = Router();

const {getBookingparking, postBookingparking, putBookingparking} = require('../controllers/bookingparking.controller');

router.get('/', getBookingparking);
router.post('/', postBookingparking);
router.put('/:id', putBookingparking);

module.exports = router;