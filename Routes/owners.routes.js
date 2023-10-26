const {Router} = require ('express')
const route = Router()
const {getOwners, postOwner, putOwner } = require ('../Controllers/owners.controller')

route.get('/', getOwners)
route.post('/', postOwner)
route.put('/', putOwner)
// route.delete('/', deleteOwner)

module.exports = route  