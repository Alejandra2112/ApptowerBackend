const { Router } = require('express')
const route = Router()
const { getEnterpriseSecurity, postEnterpriseSecurity, putEnterpriseSecurity, getEnterpriceEmail, getEnterpriceNIT } = require('../Controllers/enterprice.security.controller')
const validator = require('../Middlewares/validation.middleware');
const { postEnterpriceValidations, putEnterpriceValidations } = require('../Middlewares/enterprice.middleware')

route.get('/', getEnterpriseSecurity)
route.get('/email/:email', getEnterpriceEmail)
route.get('/NIT/:NIT', getEnterpriceNIT)
route.post('/', postEnterpriceValidations, validator, postEnterpriseSecurity)
route.put('/', putEnterpriceValidations, validator, putEnterpriseSecurity)

module.exports = route  