const { Router } = require('express');
const route = Router();
const { postEmailUser, verifyCode } = require('../Controllers/recorvedPassword.controller');
const { recoveryPasswordValidations } = require('../Middlewares/recoveryPassword.middlewaare');
const { recoveryCodeValidations } = require('../Middlewares/verifityCodeRecoveryPassword.middleware');

route.post('/', recoveryPasswordValidations, postEmailUser);
route.post('/verify', recoveryCodeValidations, verifyCode);

module.exports = route;
