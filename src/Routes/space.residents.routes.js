const { Router } = require('express')
const route = Router()
const { getOneSpaceResidents, getAllSpaceResidents, postSpaceResident, putSpaceResident, deleteSpaceResident } = require('../Controllers/space.residents.controller')
const validation = require('../Middlewares/validation.middleware')
const { createSpaceResidentValidation, updateSpaceResidentValidation } = require('../Middlewares/space.residents.middleware')


route.get('/:idSpace', getOneSpaceResidents)
route.get('/', getAllSpaceResidents)
route.post('/', createSpaceResidentValidation, validation, postSpaceResident)
route.put('/', updateSpaceResidentValidation, validation,putSpaceResident)
route.delete('/', deleteSpaceResident)

module.exports = route  