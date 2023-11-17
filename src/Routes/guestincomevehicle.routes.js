const {Router} = require('express');
const router = Router();

const {getGuestIncomeVehicle, postGuestIncomeVehicle, putGuestIncomeVehicle} = require('../controllers/guestincomevehicle.controller');

router.get('/', getGuestIncomeVehicle);
router.post('/', postGuestIncomeVehicle);
router.put('/:id', putGuestIncomeVehicle);

module.exports = router;