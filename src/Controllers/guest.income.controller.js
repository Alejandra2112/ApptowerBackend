const GuestIncome = require('../Models/guest.income.model');
const Visitors = require('../Models/visitors.model');
const ApartmentModel = require('../Models/apartment.model');
const { response } = require('express');
const GuestIncomeParking = require('../Models/guestIncomeParking.model');
const ParkingSpacesModel = require('../Models/parking.spaces.model');

const getGuestIncomeAll = async (req, res = response) => {
    try {
        const guestIncome = await GuestIncome.findAll({
            include: [
                {
                    model: Visitors,
                    as: 'asociatedVisitor',

                },
                {
                    model: ApartmentModel,
                    as: 'asociatedApartment',
                }
            ]
        });

        console.log('ingresos obtenidos correctamente:', guestIncome);

        res.json({
            guestIncome,
        });
    } catch (error) {

        console.error('Error al obtener ingresos:', error);

        res.status(500).json({
            error: 'Error al obtener ingresos',
            errormessage: error.message,
        });
    }
};

const getGuestIncomeOne = async (req, res = response) => {
    try {
        const { idGuest_income } = req.params;

        const parkingGuestIncome = await GuestIncomeParking.findOne({
            where: { idGuest_income: idGuest_income },
            include: [
                { model: ParkingSpacesModel, as: 'asociatedParkingSpace' },
            ],
        });

        const guestIncome = await GuestIncome.findOne({
            where: { idGuest_income: idGuest_income },
            include: [
                { model: Visitors, as: 'asociatedVisitor' },
                { model: ApartmentModel, as: 'asociatedApartment' },
            ],
        });

        const guestIncomeVehicle = await GuestIncomeParking.findOne({
            where: { idGuest_income: idGuest_income },
            include: [
                { model: ParkingSpacesModel, as: 'asociatedParkingSpace' } // Adjusted alias
            ]
        });


        if (!guestIncome) {
            return res.status(404).json({ error: 'No se encontró un ingreso con ese ID' });
        }

        res.json({
            guestIncome,
            guestIncomeVehicle: guestIncomeVehicle ? guestIncomeVehicle : null
        });
    } catch (error) {
        console.error('Error al obtener ingreso:', error);
        res.status(500).json({
            error: 'Error al obtener ingreso', msg: error.message,
        });
    }

}

const getGuestIncomeByApartment = async (req, res = response) => {
    try {
        const { idApartment } = req.params;

        const guestIncome = await GuestIncome.findAll({
            where: { idApartment: idApartment },
            include: [
                { model: Visitors, as: 'asociatedVisitor' },
                { model: ApartmentModel, as: 'asociatedApartment' },
            ],
        });

        if (guestIncome.length === 0) {
            return res.status(404).json({ error: 'No se encontraron ingresos para ese apartamento' });
        }

        res.json({
            guestIncome,
        });
    } catch (error) {
        console.error('Error al obtener ingresos por apartamento:', error);
        res.status(500).json({
            error: 'Error al obtener ingresos por apartamento',
        });
    }
}

const postGuestIncome = async (req, res) => {
    let message = '';
    const body = req.body;
    try {
        const createdGuestIncome = await GuestIncome.create(body);
        message = 'Ingreso Registrado Exitosamente';
        res.json({
            guestIncome: createdGuestIncome,
            message,
        });
    } catch (e) {
        res.status(500).json({
            error: e.message
        })

    }

};

const putGuestIncome = async (req, res = response) => {
    const body = req.body;
    let message = '';

    console.log(body, "Aqui el body")

    try {
        const { idGuest_income, departureDate } = body;

        const [updatedRows] = await GuestIncome.update({
            departureDate: departureDate,
        }, {
            where: { idGuest_income: idGuest_income },
        });
        console.log(updatedRows, "Aqui las rows")

        if (updatedRows > 0) {
            message = 'Ingreso modificado exitosamente.';
        } else {
            message = 'No se encontró un ingreso con ese ID';
        }
    } catch (error) {
        message = 'Error al modificar ingreso: ' + error.message;
    }
    res.json({
        guestIncome: message,
    });
};



module.exports = {
    getGuestIncomeAll,
    getGuestIncomeOne,
    postGuestIncome,
    putGuestIncome,
    getGuestIncomeByApartment,
};