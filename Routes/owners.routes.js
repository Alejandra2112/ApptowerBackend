const {Router} = require ('express')
const route = Router()
const {postPersonalInfoValidation} = require('../Middlewares/personal.information.middleware')
const validation = require('../Middlewares/validation.middleware')
const {getOwners, postOwner, putOwner } = require ('../Controllers/owners.controller')

route.get('/', getOwners)
route.post('/', postPersonalInfoValidation, validation , postOwner)
route.put('/', putOwner)
// route.delete('/', deleteOwner)

module.exports = route  