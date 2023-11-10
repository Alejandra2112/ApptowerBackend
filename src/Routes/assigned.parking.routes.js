const {Router} = require ('express')
const route = Router()
const {getApartmentWithAssignedParking, getAllAssignedParking, postAssignedParking, putAssignedParking, deleteAssignedParking } = require ('../Controllers/assigned.parkings.controller')

route.get('/:idSpace', getApartmentWithAssignedParking);
route.get('/', getAllAssignedParking)
route.post('/', postAssignedParking)
route.put('/', putAssignedParking)
route.delete('/', deleteAssignedParking)

module.exports = route  