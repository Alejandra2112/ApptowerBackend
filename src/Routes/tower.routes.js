const { Router } = require('express')
const route = Router()
const { getOneTower, getAllTower, postTower, putTower } = require('../Controllers/tower.controller');
const { towerValidationForPost, towerValidationForPut } = require('../Middlewares/towers.middleware');
const validator = require('../Middlewares/validation.middleware');

route.get('/:idTower', getOneTower);
route.get('/', getAllTower)
route.post('/', towerValidationForPost, validator, postTower)
route.put('/', towerValidationForPut, validator, putTower)

module.exports = route  