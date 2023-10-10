const {Router} = require ('express')
const route = Router()
const {getVigilantes, postVigilante, putVigilante, deleteVigilante} = require ('../Controllers/vigilantes')

route.get('/', getVigilantes)
route.post('/', postVigilante)
route.put('/', putVigilante)
route.delete('/', deleteVigilante)

module.exports = route  