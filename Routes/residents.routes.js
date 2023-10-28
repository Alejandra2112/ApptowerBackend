const {Router} = require ('express')
const route = Router()
const {postPersonalInfoValidation, postResidentInfoValidation} = require('../Middlewares/personal.information.middleware')
const validation = require('../Middlewares/validation.middleware')
const {getResidents, postResident, putResident, deleteResident } = require ('../Controllers/resident.controller')

route.get('/', getResidents)
route.post('/',postPersonalInfoValidation, postResidentInfoValidation, validation, postResident)
route.put('/', putResident)
route.delete('/', deleteResident)

module.exports = route  