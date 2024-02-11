const { Router } = require('express')
const route = Router()
const { getUser, postUser, putUser, putPersonalInformation, putChangeImg, getUserOne, postUserEmail, postUsersforLogin, resetPassword, getUserDocument, getEmailUser } = require('../Controllers/users.controller.js')
const validateUser = require('../Middlewares/user.middleware.js')


route.get('/:iduser', getUserOne);
route.get('/document/:document', getUserDocument);
route.get('/email/:email', getEmailUser);



route.get('/', getUser)
route.post('/', postUser)
route.put('/img', putChangeImg)
route.put('/personalInfo', putPersonalInformation)

route.post('/reset', resetPassword)
route.post('/login', validateUser, postUsersforLogin)
route.put('/:iduser', putUser)
route.put('/edited', putUser)
route.post('/email', postUserEmail)



module.exports = route