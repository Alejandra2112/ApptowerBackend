const {response} = require('express');
const Vehicle = require('../Models/vehicle.model');

const getVehicle = async (req, res = response) => {
    try {
        const vehicle = await Vehicle.findAll();

        res.json({
            vehicle,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error to try get vehicles',
        });
    }
}

const postVehicle = async (req, res) => {
    let message = '';
    const body = req.body;
    try {
        await Vehicle.create(body);
        message = 'Vehicle registered successfully';        
    } catch (error) {
        message = error.message;
    }
    res.json({
        vehicle: message,
    });
}

const putVehicle = async (req, res = response) => {
    const body = req.body;
    let message = '';

    try {
        const { idvehicle, Updating } = body;

        const [updatedRows] = await Vehicle.update(Updating, {
            where: { idvehicle: idvehicle },
        });

        if (updatedRows > 0) {
            message = 'Vehicle modified successfully.';
        } else {
            message = 'No vehicle found with that ID';
        }
    } catch (error) {
        message = 'Error to modify vehicle: ' + error.message;
    }
    res.json({
        vehicle: message,
    });
}

module.exports = {
    getVehicle,
    postVehicle,
    putVehicle,
}