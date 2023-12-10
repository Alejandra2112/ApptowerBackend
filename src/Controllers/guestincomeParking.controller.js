const { response } = require('express');
const GuestIncomeParking = require('../Models/guestIncomeParking.model');
const GuestIncome = require('../Models/guest.income.model');
const ParkingSpacesModel = require('../Models/parking.spaces.model');

const getGuestIncomeParking = async (req, res = response) => {
    try {
        const GuestIncomeParking = await GuestIncomeParking.findAll({
            include: [
                { model: GuestIncome, as: 'asociatedGuestIncome' },
                { model: ParkingSpacesModel, as: 'asociatedParkingSpace' },
            ],
        });

        res.json({
            guestincomeparking: GuestIncomeParking,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener el parqueadero del ingreso',
        });
    }
}

const getGuestIncomeParkingOne = async (req, res = response) => {
    try {
        const { idGuestIncomeParking } = req.params;

        const GuestIncomeParking = await GuestIncomeParking.findOne({
            where: { idGuestIncomeParking: idGuestIncomeParking },
            include: [
                { model: GuestIncome, as: 'asociatedGuestIncome' },
                { model: ParkingSpacesModel, as: 'asociatedParkingSpace' },
            ],
        });

        if (!GuestIncomeParking) {
            return res.status(404).json({ error: 'No se encontró un parqueadero con ese ID' });
        }

        res.json({
            guestincomeparking: GuestIncomeParking,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener el parqueadero del ingreso',
        });
    }

}

const getGuestIncomeParkingByApartment = async (req, res = response) => {
    try {
        const { idApartment } = req.params;

        const GuestIncomeParking = await GuestIncomeParking.findAll({
            where: { idApartment: idApartment },
            include: [
                { model: GuestIncome, as: 'asociatedGuestIncome' },
                { model: ParkingSpacesModel, as: 'asociatedParkingSpace' },
            ],
        });

        if (!GuestIncomeParking) {
            return res.status(404).json({ error: 'No se encontró un ingreso con parqueadero con ese ID' });
        }

        res.json({
            guestincomeparking: GuestIncomeParking,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener el parqueadero del ingreso',
        });
    }


}

const postGuestIncomeParking = async (req, res) => {
    let message = '';
    const body = req.body;
    try {
        await GuestIncomeParking.create(body);
        message = 'Vehiculo del visitante ingresado exitosamente';
    } catch (error) {
        message = error.message;
    }
    res.json({
        bookingparking: message,
    });
}



const putGuestIncomeParking = async (req, res = response) => {
    const body = req.body;
    let message = '';

    try {
        const { idbookingparking, Updating } = body;

        const [updatedRows] = await GuestIncomeParking.update(Updating, {
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
    getGuestIncomeParking,
    getGuestIncomeParkingOne,
    getGuestIncomeParkingByApartment,
    postGuestIncomeParking,
    putGuestIncomeParking,
}