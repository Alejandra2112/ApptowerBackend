const {Router} = require ('express')
const route = Router()
const {getParkingSpace, postParkingSpace, putParkingSpace } = require ('../Controllers/parking.spaces.controller')

route.get('/', getParkingSpace)
route.post('/', postParkingSpace)
route.put('/', putParkingSpace)
// route.delete('/', deleteParkingSpace)

module.exports = route  