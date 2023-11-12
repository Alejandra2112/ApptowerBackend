const {response} = require('express');
const guestincomevehicle = require('../Models/guestIncomeVehicle.model');
//GET ONE X ID USER
const getGuestIncomeVehicle = async (req, res = response) => {
    try {
        const guestincomevehicle = await guestincomevehicle.findAll();

        res.json({
            bookingparking: guestincomevehicle,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener el vehiculo del visitante',
        });
    }
}

const postGuestIncomeVehicle = async (req, res) => {
    let message = '';
    const body = req.body;
    try {
        await guestincomevehicle.create(body);
        message = 'Vehiculo del visitante ingresado exitosamente';        
    } catch (error) {
        message = error.message;
    }
    res.json({
        bookingparking: message,
    });
}

const putGuestIncomeVehicle = async (req, res = response) => {
    const body = req.body;
    let message = '';

    try {
        const { idbookingparking, Updating } = body;

        const [updatedRows] = await guestincomevehicle.update(Updating, {
            where: { idbookingparking: idbookingparking },
        });

        if (updatedRows > 0) {
            message = 'Ingreso vehiculo del visitante modificada exitosamente.';
        } else {
            message = 'No se encontró un vehiculo del visitante con ese ID';
        }
    } catch (error) {
        message = 'Error al modificar ingreso de vehiculo: ' + error.message;
    }
    res.json({
        bookingparking: message,
    });
}

module.exports = {
    getGuestIncomeVehicle,
    postGuestIncomeVehicle,
    putGuestIncomeVehicle,
}