const { Router } = require('express')
const route = Router()
const { getOneApartment, getAllApartment, postApartment, putApartment } = require('../Controllers/apartment.controller')

route.get('/:idApartment', getOneApartment);
route.get('/', getAllApartment)
route.post('/', postApartment)
route.put('/', putApartment)
// route.delete('/', deleteSpace)

module.exports = route  