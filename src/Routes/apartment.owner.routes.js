const { Router } = require('express')
const route = Router()
const { getOneApartmentOwners, getAllApartmentOwners, postApartmentOwner, putApartmentOwner, deleteApartmentOwner } = require('../Controllers/apartment.owners.controller')

route.get('/:idApartment', getOneApartmentOwners)
route.get('/', getAllApartmentOwners)
route.post('/',  postApartmentOwner)
route.put('/', putApartmentOwner)
route.delete('/', deleteApartmentOwner)

module.exports = route  