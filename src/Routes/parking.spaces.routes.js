const { Router } = require('express')
const route = Router()
const { getOneParkingSpace, getAllParkingSpace, postParkingSpace, putParkingSpace } = require('../Controllers/parking.spaces.controller')
const { createParkinValidation, updateParkinValidation } = require('../Middlewares/parking.spaces.middleware')
const validation = require('../Middlewares/validation.middleware')

route.get('/:idParkingSpace', getOneParkingSpace)
route.get('/', getAllParkingSpace)
route.post('/', createParkinValidation, validation, postParkingSpace)
route.put('/', updateParkinValidation, validation, putParkingSpace)
// route.delete('/', deleteParkingSpace)

module.exports = route  