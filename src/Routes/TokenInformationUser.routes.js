const { Router } = require('express');
const route = Router();
const { getInformationUser, putInformationUser } = require('../Controllers/TokenPermission.controller');
const verifityToken = require('../Middlewares/verifityToken');

route.get('/', verifityToken, getInformationUser);
route.put('/', verifityToken, putInformationUser);


module.exports = route;