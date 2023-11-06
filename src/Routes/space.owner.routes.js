const { Router } = require('express')
const route = Router()
const { getOneSpaceOwners, getAllSpaceOwners, postSpaceOwner, putSpaceOwner, deleteSpaceOwner } = require('../Controllers/space.owners.controller')
const { createSpaceOwnersValidation, updateSpaceOwnersValidation } = require ('../Middlewares/space.owners.middleware')
const validation = require('../Middlewares/validation.middleware')

route.get('/:idSpace', getOneSpaceOwners)
route.get('/', getAllSpaceOwners)
route.post('/', createSpaceOwnersValidation, validation, postSpaceOwner)
route.put('/', updateSpaceOwnersValidation, validation,putSpaceOwner)
route.delete('/', deleteSpaceOwner)

module.exports = route  