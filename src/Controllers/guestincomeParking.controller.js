const { response } = require('express');
const GuestIncomeParking = require('../Models/guestIncomeParking.model');
const GuestIncome = require('../Models/guest.income.model');
const ParkingSpacesModel = require('../Models/parking.spaces.model');
const UserModel = require('../Models/users.model');
const ApartmentModel = require('../Models/apartment.model');
const Notification = require('../Models/notification.model');
const Visitors = require('../Models/visitors.model');
const Guest_income = require('../Models/guest.income.model');

const getGuestIncomeParking = async (req, res = response) => {
    try {
        const guestIncomeParking = await GuestIncomeParking.findAll({
            include: [
                { model: GuestIncome, as: 'asociatedGuestIncome' },
                { model: ParkingSpacesModel, as: 'asociatedParkingSpace' },
            ],
        });

        res.json({
            guestincomeparking: guestIncomeParking,
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

        const guestIncomeParking = await GuestIncomeParking.findOne({
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
            guestincomeparking: guestIncomeParking,
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

        const guestIncomeParking = await GuestIncomeParking.findAll({
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
            guestincomeparking: guestIncomeParking,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener el parqueadero del ingreso',
        });
    }


}
const postGuestIncomeParking = async (req, res) => {
    try {
        const body = req.body;

        const guestIncomeParking = await GuestIncomeParking.create(body);

        const userLogged = await UserModel.findByPk(body.idUserLogged);

        let notification;

        const dataGuest_income = await Guest_income.findByPk(body.idGuest_income);

        // Buscar al visitante y al apartamento asociado
        const visitor = await Visitors.findByPk(dataGuest_income.idVisitor);
        const apartment = await ApartmentModel.findByPk(dataGuest_income.idApartment);

        // Buscar el espacio de estacionamiento asociado
        const parking = await ParkingSpacesModel.findByPk(body.idParkingSpace);

        // Si el espacio de estacionamiento está activo, actualizar su estado a inactivo
        if (parking && parking.status === 'Active') {
            await parking.update({ status: 'Inactive' });
        }

        if (body.idUserLogged && userLogged) {
            notification = await Notification.create({
                iduser: body.idUserLogged,
                type: 'success',
                content: {
                    // Crear un mensaje de notificación con información del visitante y del apartamento
                    message: `Se registró el ingreso de ${visitor.name} ${visitor.lastname} 
                    ${apartment ? `al apartamento ${apartment.apartmentName}` : ''} 
                    ${parking ? `ocupará el parqueadero ${parking.parkingType} ${parking.parkingName}` : ''}`,
                    information: { userLogged, guest_income: dataGuest_income }

                },
                datetime: new Date()
            });
        }

        res.json({
            message: notification.content.message
        });
    } catch (error) {
        // Manejar errores
        console.error('Error al registrar ingreso:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
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
        guestIncomeParking: message,
    });
}

module.exports = {
    getGuestIncomeParking,
    getGuestIncomeParkingOne,
    getGuestIncomeParkingByApartment,
    postGuestIncomeParking,
    putGuestIncomeParking,
}