const {Router} = require ('express')
const route = Router()
const {getUsuario, postUsuario, putUsuario, deleteUsuario} = require ('../Controllers/usuario')

route.get('/', getUsuario)
route.post('/', postUsuario)
route.put('/', putUsuario)
route.delete('/', deleteUsuario)

module.exports = route  