const {Router} = require ('express')
const route = Router()
const {getVisitors, postVisitors, putVisitors, deleteVisitors} = require ('../Controllers/visitors');

route.get('/', getVisitors)
route.post('/', postVisitors)
route.put('/', putVisitors)
route.delete('/', deleteVisitors)

module.exports = route