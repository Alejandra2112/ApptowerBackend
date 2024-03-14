const { Router } = require('express')
const route = Router()
const { getOneParkingSpace, getAllParkingSpace, postParkingSpace, putParkingSpace } = require('../Controllers/parking.spaces.controller')
const { parkingValidationForPost, parkingValidationForPut } = require('../Middlewares/parking.spaces.middleware');
const validator = require('../Middlewares/validation.middleware');

route.get('/:idParkingSpace', getOneParkingSpace)
route.get('/', getAllParkingSpace)
route.post('/', parkingValidationForPost, validator, postParkingSpace)
route.put('/', parkingValidationForPut, validator, putParkingSpace)
// route.delete('/', deleteParkingSpace)

module.exports = route  