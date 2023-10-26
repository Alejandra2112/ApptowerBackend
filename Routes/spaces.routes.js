const {Router} = require ('express')
const route = Router()
const {getSpace, postSpace, putSpace } = require ('../Controllers/spaces.controller')

route.get('/', getSpace)
route.post('/', postSpace)
route.put('/', putSpace)
// route.delete('/', deleteSpace)

module.exports = route  