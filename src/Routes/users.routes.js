const { Router } = require('express')
const route = Router()
const { getUser, postUser, putUser, getUserOne, postUserEmail, postUsersforLogin, resetPassword } = require('../Controllers/users.controller.js')
const validateUser = require('../Middlewares/user.middleware.js')


route.get('/:iduser', getUserOne);


route.get('/', getUser)
route.post('/', validateUser, postUser)
route.post('/reset', resetPassword)
route.post('/login', validateUser, postUsersforLogin)
route.put('/:iduser', putUser)
route.post('/email', postUserEmail)



module.exports = route