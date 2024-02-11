const { Router } = require('express')
const route = Router()
const validation = require('../Middlewares/validation.middleware')
const { getOneResidents, getAllResidents, postResident, putResident } = require('../Controllers/resident.controller')

route.get('/:iduser', getOneResidents)
route.get('/', getAllResidents)
route.post('/', postResident)
route.put('/', putResident)

// route.delete('/', deleteResident)
// route.get('/document/:document', getResidentDocument)


module.exports = route  