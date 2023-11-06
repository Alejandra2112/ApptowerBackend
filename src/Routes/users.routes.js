const { Router } = require('express')
const route = Router()
const { getUser, postUser, putUser, deleteUser, getUserOne } = require('../Controllers/users.controller.js')
const validateUser = require('../Middlewares/user.middleware.js')


route.get('/:iduser', getUserOne);


route.get('/', getUser)
route.post('/', validateUser, postUser)
route.put('/', validateUser, putUser)
route.delete('/', deleteUser)

module.exports = route