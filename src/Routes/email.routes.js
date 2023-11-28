const { Router } = require('express');
const route = Router();
const { postEmailUser } = require('../Controllers/recorvedPassword.controller');

route.post('/', postEmailUser);

module.exports = route;
