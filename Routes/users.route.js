const {Router} = require ('express')
const route = Router()
const {getUser, postUser, putUser, deleteUser} = require ('../Controllers/users.controller.js')
const verificarToken = require('../Middlewares/verifityToken')
const checkPermission = require('../Middlewares/checkPermission')

route.get('/', getUser)
route.post('/', postUser)
route.put('/', putUser)
route.delete('/',  deleteUser)

module.exports = route  