const { Router } = require('express')
const route = Router()
const { getApartmentWithAssignedParking, getAllAssignedParking, postAssignedParking, putAssignedParking, deleteAssignedParking } = require('../Controllers/assigned.parkings.controller');
const { assignedParkingValidationForPost, assignedParkingValidationForPut } = require('../Middlewares/assigned.parking.middleware');
const validator = require('../Middlewares/validation.middleware');
const { idApartmentValidationsForPost } = require('../Middlewares/apartments.middleware');

route.get('/:idApartment', getApartmentWithAssignedParking);
route.get('/', getAllAssignedParking)
route.post('/',idApartmentValidationsForPost,  assignedParkingValidationForPost, validator, postAssignedParking)
route.put('/', assignedParkingValidationForPut, validator, putAssignedParking)
route.delete('/', deleteAssignedParking)

module.exports = route  