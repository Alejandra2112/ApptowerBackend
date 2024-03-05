const { Router } = require('express')
const route = Router()
const { getOneResidents, getAllResidents, postResident, putResident, putResidentStatus } = require('../Controllers/resident.controller')
const { residentStatusValidation } = require('../Middlewares/residents.middleware')
const validator = require('../Middlewares/validation.middleware')

route.get('/:iduser', getOneResidents)
route.get('/', getAllResidents)
route.post('/', postResident)
route.put('/', putResident)
route.put('/status', residentStatusValidation, validator, putResidentStatus)

// route.delete('/', deleteResident)
// route.get('/document/:document', getResidentDocument)


module.exports = route  