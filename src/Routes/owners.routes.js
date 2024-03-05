const { Router } = require('express')
const route = Router()
const validator = require('../Middlewares/validation.middleware')
const { getOneOwner, getAllOwners, postOwner, putOwner } = require('../Controllers/owners.controller')
const { ownerStatusValidation } = require('../Middlewares/owner.middleware')

route.get('/:idOwner', getOneOwner)
route.get('/', getAllOwners)
route.post('/', postOwner)
route.put('/', ownerStatusValidation, validator, putOwner)
// route.delete('/', deleteOwner)

module.exports = route  