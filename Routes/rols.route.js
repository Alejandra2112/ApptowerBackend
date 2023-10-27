const {Router} = require ('express')
const route = Router()
const {getRols, postRols, putRols, deleteRols} = require ('../Controllers/rols.controller')
const validateRols = require('../Middlewares/rols.middleware')


route.get('/', getRols)
route.post('/', validateRols,postRols)
route.put('/', validateRols,  putRols)
route.delete('/', deleteRols)

module.exports = route  