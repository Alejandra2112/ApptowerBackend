const { Router } = require('express')
const route = Router()
const validator = require('../Middlewares/validation.middleware')
const { getOneOwner, getAllOwners, postOwner, putOwner } = require('../Controllers/owners.controller')
const { ownerStatusValidation, createAapartmentOwnerValidationforPost } = require('../Middlewares/owner.middleware')
const { passwordValidationForPost, userPersonalInfoValidationForPost, ageValidation } = require('../Middlewares/user.middleware')
const { idApartmentValidationsForPost } = require('../Middlewares/apartments.middleware')
const { OwnershipStartDateValidationForPost } = require('../Middlewares/apartment.owners.middleware');
const { fileValidationForPost } = require('../Middlewares/uploads.middleware')

route.get('/:idOwner', getOneOwner)
route.get('/', getAllOwners)

route.post('/',
    userPersonalInfoValidationForPost, ageValidation, idApartmentValidationsForPost,
    createAapartmentOwnerValidationforPost, OwnershipStartDateValidationForPost,
    // passwordValidationForPost, 
    fileValidationForPost, validator, postOwner)

route.put('/',
    ownerStatusValidation,
    validator,
    putOwner)
// route.delete('/', deleteOwner)

module.exports = route  