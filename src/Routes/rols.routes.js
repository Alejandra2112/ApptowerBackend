const { Router } = require('express')
const route = Router()
const { getRols, postRols, putRols, getRolsOne, getRolsNameRole } = require('../Controllers/rols.controller')
const { validateRols } = require('../Middlewares/rols.middleware')

route.get('/:idrole', getRolsOne)
route.get('/namerole/:namerole', getRolsNameRole)

route.get('/', getRols)
route.post('/', validateRols, postRols)
route.put('/:idrole', validateRols, putRols)


module.exports = route  