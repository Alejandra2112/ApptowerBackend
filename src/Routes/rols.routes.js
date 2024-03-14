const { Router } = require('express')
const route = Router()
const { getRols, postRols, putRols, getRolsOne, getRolsNameRole } = require('../Controllers/rols.controller')
const { rolValidations } = require('../Middlewares/rols.middleware')

route.get('/:idrole', getRolsOne)
route.get('/namerole/:namerole', getRolsNameRole)

route.get('/', getRols)
route.post('/', rolValidations, postRols)
route.put('/:idrole', rolValidations, putRols)


module.exports = route  