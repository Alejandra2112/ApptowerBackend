const { Router } = require('express')
const route = Router()
const { getOneApartment, getAllApartment, postApartment, putApartment } = require('../Controllers/apartment.controller')
const validator = require('../Middlewares/validation.middleware');
const { apartmentValidationForPut, apartmentsVlidationForPost, idApartmentValidationsForPost, idApartmentValidationsForPut } = require('../Middlewares/apartments.middleware');

route.get('/:idApartment', getOneApartment);
route.get('/', getAllApartment)
route.post('/', apartmentsVlidationForPost, validator, postApartment)
route.put('/', idApartmentValidationsForPost, apartmentValidationForPut, validator, putApartment)
// route.delete('/', deleteSpace)

module.exports = route  