const { Router } = require('express')
const route = Router()
const { getUser, postUser, putUser, putPersonalInformation, putChangeImg, getUserOne, postUserEmail, postUsersforLogin, resetPassword, getUserDocument, getEmailUser, putPasswordUser } = require('../Controllers/users.controller.js')
const { UserValidationes } = require('../Middlewares/user.middleware.js')

route.get('/:iduser', getUserOne);
route.get('/document/:document', getUserDocument);
route.get('/email/:email', getEmailUser);



route.get('/', getUser)
route.post('/', UserValidationes, postUser)
route.put('/img', putChangeImg)
route.put('/password', putPasswordUser)
route.put('/personalInfo', putPersonalInformation)

route.post('/reset', resetPassword) //cambiar contraseña desde el restablecer contraseña
route.put('/:iduser', UserValidationes, putUser)
// route.put('/edited', putUser)
route.post('/email', postUserEmail)



module.exports = route