const {Router} = require ('express')
const route = Router()
const {getSpaceOwners, postSpaceOwner, putSpaceOwner, deleteSpaceOwner } = require ('../Controllers/space.owners.controller')

route.get('/', getSpaceOwners)
route.post('/', postSpaceOwner)
route.put('/', putSpaceOwner)
route.delete('/', deleteSpaceOwner)

module.exports = route  