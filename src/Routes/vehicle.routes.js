const { Router } = require('express');
const route = Router();
const { getVehicle, postVehicle, putVehicle, deleteVehucle, getOneVehicleByAparment } = require('../Controllers/vehicle.controller');
const { vehiclesValidationsForPost, vehiclesValidationsForPut } = require('../Middlewares/vehicle.middleware');
const validator = require('../Middlewares/validation.middleware');
const { idApartmentValidationsForPost } = require('../Middlewares/apartments.middleware');

route.get('/', getVehicle);
route.post('/', idApartmentValidationsForPost, vehiclesValidationsForPost, validator, postVehicle);
route.put('/', idApartmentValidationsForPost, vehiclesValidationsForPut, validator, putVehicle);
route.delete('/', deleteVehucle);
route.get('/:idApartment', getOneVehicleByAparment);

module.exports = route;