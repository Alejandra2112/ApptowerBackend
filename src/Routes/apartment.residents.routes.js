const { Router } = require('express')
const route = Router()
const { getOneApartmentResidents, getAllApartmentResidents, postApartmentResident, putApartmentResident, deleteApartmentResident, getApartmentsResidents } = require('../Controllers/apartment.residents.controller')


route.get('/:idApartment', getOneApartmentResidents)
route.get('/resident/:idResident', getApartmentsResidents)
route.get('/', getAllApartmentResidents)
route.post('/', postApartmentResident)
route.put('/', putApartmentResident)
route.delete('/', deleteApartmentResident)

module.exports = route  