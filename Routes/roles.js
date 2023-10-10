const {Router} = require ('express')
const route = Router()
const {getRoles, postRoles, putRoles, deleteRoles} = require ('../Controllers/roles')

route.get('/', getRoles)
route.post('/', postRoles)
route.put('/', putRoles)
route.delete('/', deleteRoles)

module.exports = route  