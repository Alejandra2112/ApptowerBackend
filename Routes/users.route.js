const {Router} = require ('express')
const route = Router()
const {getUser, postUser, putUser, deleteUser} = require ('../Controllers/users.controller.js')
// const verificarToken = require('../Middlewares/verifityToken')
// const checkPermission = require('../Middlewares/checkPermission')
const { validateUser } = require('../Middlewares/user.middleware.js')

route.get('/', getUser)
route.post('/', validateUser ,postUser)
route.put('/', validateUser,putUser)
route.delete('/',  deleteUser)

module.exports = route  