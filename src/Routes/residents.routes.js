const { Router } = require('express')
const route = Router()
const { postPersonalInfoValidation, postResidentInfoValidation, postDocNumberResident, putResidentInfoValidation, putPersonalInfoValidation, putDocNumberResident } = require('../Middlewares/personal.information.middleware')
const validation = require('../Middlewares/validation.middleware')
const { getOneResidents, getAllResidents, postResident, putResident, deleteResident, getResidentDocument } = require('../Controllers/resident.controller')

route.get('/:idResident', getOneResidents)
route.get('/document/:document', getResidentDocument)
route.get('/', getAllResidents)
route.post('/', postPersonalInfoValidation, postResidentInfoValidation, postDocNumberResident, validation, postResident)
route.put('/', putPersonalInfoValidation, putResidentInfoValidation, putDocNumberResident, validation, putResident)
route.delete('/', deleteResident)

module.exports = route  