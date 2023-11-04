const { Router } = require('express')
const route = Router()
const { getWatchman, postWatchman, putWatchman, deleteWatchman } = require('../Controllers/watchmans.controller');
const validateWatchman = require('../Middlewares/watchman.middleware');


route.get('/', getWatchman)
route.post('/', validateWatchman, postWatchman)
route.put('/', putWatchman)
route.delete('/', deleteWatchman)

module.exports = route  