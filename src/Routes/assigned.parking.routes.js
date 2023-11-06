const {Router} = require ('express')
const route = Router()
const {getSpacesWithAssignedParking, getAllAssignedParking, postAssignedParking, putAssignedParking, deleteAssignedParking } = require ('../Controllers/assigned.parkings.controller')

route.get('/:idSpace', getSpacesWithAssignedParking);
route.get('/', getAllAssignedParking)
route.post('/', postAssignedParking)
route.put('/', putAssignedParking)
route.delete('/', deleteAssignedParking)

module.exports = route  