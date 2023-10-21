const {Router} = require ('express')
const route = Router()
const {getRols, postRols, putRols, deleteRols} = require ('../Controllers/rols')

route.get('/', getRols)
route.post('/', postRols)
route.put('/', putRols)
route.delete('/', deleteRols)

module.exports = route  