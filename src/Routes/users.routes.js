const { Router } = require('express')
const route = Router()
const { getUser, postUser, putUser, getUserOne, postUserEmail } = require('../Controllers/users.controller.js')
const validateUser = require('../Middlewares/user.middleware.js')


route.get('/:iduser', getUserOne);


route.get('/', getUser)
route.post('/', validateUser, postUser)
route.put('/', putUser)
route.post('/email', postUserEmail)



module.exports = route