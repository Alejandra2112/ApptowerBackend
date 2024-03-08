const { Router } = require('express')
const route = Router()
const { getOneApartmentOwners, getAllApartmentOwners, postApartmentOwner, putApartmentOwner, deleteApartmentOwner } = require('../Controllers/apartment.owners.controller')
const { apartmentOwnerValidationForPut, apartmentOwnerValidationForPost, OwnershipStartDateValidationForPost } = require('../Middlewares/apartment.owners.middleware');
const { idApartmentValidationsForPost } = require('../Middlewares/apartments.middleware');
const validator = require('../Middlewares/validation.middleware');
const { createAapartmentOwnerValidationforPost } = require('../Middlewares/owner.middleware');

route.get('/:idApartment', getOneApartmentOwners)
route.get('/', getAllApartmentOwners)
route.post('/', idApartmentValidationsForPost, createAapartmentOwnerValidationforPost,
    apartmentOwnerValidationForPost, OwnershipStartDateValidationForPost, validator, postApartmentOwner)
route.put('/', idApartmentValidationsForPost, apartmentOwnerValidationForPut, validator, putApartmentOwner)
route.delete('/', deleteApartmentOwner)

module.exports = route  