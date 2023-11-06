const {Router} = require ('express')
const route = Router()
const {getParkingSpace, postParkingSpace, putParkingSpace } = require ('../Controllers/parking.spaces.controller')
const { createParkinValidation, updateParkinValidation } = require('../Middlewares/parking.spaces.middleware')
const validation  = require('../Middlewares/validation.middleware')

route.get('/', getParkingSpace)
route.post('/', createParkinValidation, validation, postParkingSpace)
route.put('/', updateParkinValidation, validation, putParkingSpace)
// route.delete('/', deleteParkingSpace)

module.exports = route  