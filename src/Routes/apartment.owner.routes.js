const { Router } = require('express')
const route = Router()
const { getOneApartmentOwners, getAllApartmentOwners, postApartmentOwner, putApartmentOwner, deleteApartmentOwner } = require('../Controllers/apartment.owners.controller')
const { apartmentOwnerValidationForPut } = require('../Middlewares/apartment.owners.middleware');
const validator = require('../Middlewares/validation.middleware');

route.get('/:idApartment', getOneApartmentOwners)
route.get('/', getAllApartmentOwners)
route.post('/', postApartmentOwner)
route.put('/', apartmentOwnerValidationForPut, validator, putApartmentOwner)
route.delete('/', deleteApartmentOwner)

module.exports = route  