const { Router } = require('express')
const route = Router()
const { postPersonalInfoValidation, postDocNumberOwner, putDocNumberOwner, putPersonalInfoValidation } = require('../Middlewares/personal.information.middleware')
const validation = require('../Middlewares/validation.middleware')
const { getOneOwners, getAllOwners, postOwner, putOwner } = require('../Controllers/owners.controller')

route.get('/:idOwner', getOneOwners)
route.get('/', getAllOwners)
route.post('/', postPersonalInfoValidation, postDocNumberOwner, validation, postOwner)
route.put('/', putDocNumberOwner, putPersonalInfoValidation, validation, putOwner)
// route.delete('/', deleteOwner)

module.exports = route  