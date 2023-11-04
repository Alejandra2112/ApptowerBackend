const { Router } = require('express');
const route = Router();
const { getUser, postUser, putUser, deleteUser, getUserOne } = require('../Controllers/users.controller.js');
const validateUser = require('../Middlewares/user.middleware.js');
const verificarToken = require('../Middlewares/verifityToken.js');
const checkPermissions = require('../Middlewares/checkPermission.js');


route.use(verificarToken);

route.get('/:iduser', checkPermissions('Get_User', 'users'), getUserOne);
route.get('/', checkPermissions('Get_User', 'users'), getUser);
route.post('/', checkPermissions('Post_User', 'users'), validateUser, postUser);
route.put('/', checkPermissions('Put_User', 'users'), putUser);
route.delete('/', checkPermissions('Delete_User', 'users'), deleteUser);

module.exports = route;

// const { Router } = require('express')
// const route = Router()
// const { getUser, postUser, putUser, deleteUser, getUserOne } = require('../Controllers/users.controller.js')
// const validateUser = require('../Middlewares/user.middleware.js')


// route.get('/:iduser', getUserOne);


// route.get('/', getUser)
// route.post('/', validateUser, postUser)
// route.put('/', putUser)
// route.delete('/', deleteUser)

// module.exports = route