const {Router} = require ('express')
const route = Router()
const {getAllSpaceOwners, getSpaceOwners, postSpaceOwner, putSpaceOwner, deleteSpaceOwner } = require ('../Controllers/space.owners.controller')

route.get('/:idSpace', getSpaceOwners)
route.get('/', getAllSpaceOwners)
route.post('/', postSpaceOwner)
route.put('/', putSpaceOwner)
route.delete('/', deleteSpaceOwner)

module.exports = route  