const { Router } = require('express');
const route = Router();
const { postEmailUser, verifyCode } = require('../Controllers/recorvedPassword.controller');

route.post('/', postEmailUser);
route.post('/verify', verifyCode);

module.exports = route;
