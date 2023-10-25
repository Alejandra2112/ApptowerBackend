const {Router} = require('express');
const route = Router();
const {getVehicle, postVehicle, putVehicle} = require('../Controllers/vehicle.controller');

route.get('/', getVehicle);
route.post('/', postVehicle);
route.put('/', putVehicle);

module.exports = route;