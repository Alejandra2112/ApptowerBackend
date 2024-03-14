const { Router } = require('express')
const route = Router()
const { getOneApartmentResidents, getAllApartmentResidents, postApartmentResident, putApartmentResident, deleteApartmentResident, getApartmentsResidents } = require('../Controllers/apartment.residents.controller')
const { apartmentResidentValidationForPost, apartmentResidentValidationForPut, apartmentResidentValidationForDelete, residentStartDateValidationForPost } = require('../Middlewares/apartment.residents.middleware')
const validator = require('../Middlewares/validation.middleware');


route.get('/:idApartment', getOneApartmentResidents)
route.get('/resident/:idResident', getApartmentsResidents)
route.get('/', getAllApartmentResidents)
route.post('/', apartmentResidentValidationForPost, residentStartDateValidationForPost, validator, postApartmentResident)
route.put('/', apartmentResidentValidationForPut, validator, putApartmentResident)
route.delete('/', apartmentResidentValidationForDelete, validator, deleteApartmentResident)

module.exports = route  