const { Router } = require('express')
const route = Router()
const validation = require('../Middlewares/validation.middleware')
const { getOneOwner, getAllOwners, postOwner, putOwner } = require('../Controllers/owners.controller')

route.get('/:idOwner', getOneOwner)
route.get('/', getAllOwners)
route.post('/', postOwner)
route.put('/', putOwner)
// route.delete('/', deleteOwner)
 
module.exports = route  