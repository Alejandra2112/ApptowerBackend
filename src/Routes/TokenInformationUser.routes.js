const { Router } = require('express');
const route = Router();
const { getInformationUser } = require('../Controllers/TokenPermission.controller');
const verifityToken = require('../Middlewares/verifityToken');

route.get('/', verifityToken, getInformationUser);

module.exports = route;