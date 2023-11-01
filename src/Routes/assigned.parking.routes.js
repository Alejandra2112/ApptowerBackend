const {Router} = require ('express')
const route = Router()
const {getAssignedParking, postAssignedParking, putAssignedParking, deleteAssignedParking } = require ('../Controllers/assigned.parkings.controller')

route.get('/', getAssignedParking)
route.post('/', postAssignedParking)
route.put('/', putAssignedParking)
route.delete('/', deleteAssignedParking)

module.exports = route  