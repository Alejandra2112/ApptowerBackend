const { Router } = require('express')
const route = Router()
const { getOneApartmentOwners, getAllApartmentOwners, postApartmentOwner, putApartmentOwner, deleteApartmentOwner } = require('../Controllers/apartment.owners.controller')
const { apartmentOwnerValidationForPut, apartmentOwnerValidationForPost } = require('../Middlewares/apartment.owners.middleware');
const { idApartmentValidationsForPost } = require('../Middlewares/apartments.middleware');
const validator = require('../Middlewares/validation.middleware');

route.get('/:idApartment', getOneApartmentOwners)
route.get('/', getAllApartmentOwners)
route.post('/', idApartmentValidationsForPost  ,apartmentOwnerValidationForPost, validator, postApartmentOwner)
route.put('/',idApartmentValidationsForPost,  apartmentOwnerValidationForPut, validator, putApartmentOwner)
route.delete('/', deleteApartmentOwner)

module.exports = route  