const {Router} = require ('express')
const route = Router()
const {getWatchman, postWatchman, putWatchman, deleteWatchman} = require ('../Controllers/watchmans.controller')

route.get('/', getWatchman)
route.post('/', postWatchman)
route.put('/', putWatchman)
route.delete('/', deleteWatchman)

module.exports = route  