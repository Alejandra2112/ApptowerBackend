const {Router} = require ('express')
const route = Router()
const {getWatchman, postWatchman, putWatchman, deleteWatchman} = require ('../Controllers/watchman')

route.get('/', getWatchman)
route.post('/', postWatchman)
route.put('/', putWatchman)
route.delete('/', deleteWatchman)

module.exports = route  