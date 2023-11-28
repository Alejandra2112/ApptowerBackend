const {Router} = require('express');
const route = Router();
const {getVehicle, postVehicle, putVehicle, getOneVehicleBySpaces} = require('../Controllers/vehicle.controller');

route.get('/', getVehicle);
route.post('/', postVehicle);
route.put('/', putVehicle);
route.get('/:idSpace', getOneVehicleBySpaces);

module.exports = route;