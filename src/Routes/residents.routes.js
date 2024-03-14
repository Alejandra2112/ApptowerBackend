const { Router } = require('express')
const route = Router()
const { getOneResidents, getAllResidents, postResident, putResident, putResidentStatus } = require('../Controllers/resident.controller')
const { residentStatusValidation, residentTypeValidation } = require('../Middlewares/residents.middleware')
const validator = require('../Middlewares/validation.middleware')
const { userPersonalInfoValidationForPost, ageValidation, passwordValidationForPost } = require('../Middlewares/user.middleware')
const { idApartmentValidationsForPost } = require('../Middlewares/apartments.middleware')
const { fileValidationForPost } = require('../Middlewares/uploads.middleware')
const { residentStartDateValidationForPost } = require('../Middlewares/apartment.residents.middleware')

route.get('/:iduser', getOneResidents)
route.get('/', getAllResidents)
route.post('/', userPersonalInfoValidationForPost, idApartmentValidationsForPost,
    residentStartDateValidationForPost, residentTypeValidation, passwordValidationForPost, fileValidationForPost, validator, postResident)
route.put('/', putResident)
route.put('/status', residentStatusValidation, validator, putResidentStatus)

// route.delete('/', deleteResident)
// route.get('/document/:document', getResidentDocument)


module.exports = route  