const {Router} = require('express');
const route = Router();
const {getVehicle, postVehicle, putVehicle, deleteVehucle, getOneVehicleByAparment} = require('../Controllers/vehicle.controller');

route.get('/', getVehicle);
route.post('/', postVehicle);
route.put('/', putVehicle);
route.delete('/', deleteVehucle);
route.get('/:idApartment', getOneVehicleByAparment);

module.exports = route;