const { Router } = require('express')
const route = Router()
const { getOneTower, getAllTower, postTower, putTower } = require('../Controllers/tower.controller')

route.get('/:idTower', getOneTower);
route.get('/', getAllTower)
route.post('/', postTower)
route.put('/', putTower)

module.exports = route  