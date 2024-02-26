const { response } = require('express');
const Vehicle = require('../Models/vehicle.model');
const ApartmentModel = require('../Models/apartment.model');
const UserModel = require('../Models/users.model');
const Notification = require('../Models/notification.model');
const getVehicle = async (req, res = response) => {
    try {
        const vehicle = await Vehicle.findAll({
            include: [
                { model: ApartmentModel, attributes: ['apartmentName', 'area', 'status'] },
            ],

        });

        res.json({
            vehicle,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error to try get vehicles' + error.message,
        });
    }
}
const getOneVehicleByAparment = async (req, res = response) => {
    const { idApartment } = req.params;
    try {
        const vehicle = await Vehicle.findAll({
            where: {
                idApartment: idApartment,
            },
            include: [
                { model: ApartmentModel, attributes: ['apartmentName', 'area', 'status'] },
            ],
        });

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

    try {
        const body = req.body;
        const vehicle = await Vehicle.create(body);

        // Notification

        const userLogged = await UserModel.findByPk(body.idUserLogged)

        let notification;

        let apartment = await ApartmentModel.findByPk(body.idApartment)


        if (body.idUserLogged && userLogged) {

            notification = await Notification.create({

                iduser: body.idUserLogged,
                type: 'success',
                content: {
                    message: `Se agrego el vehiculo de placa ${vehicle.licenseplate}
                      ${apartment ? `al apartamento ${apartment.apartmentName}` : ''}
                     `,
                    information: { userLogged, apartment }
                },
                datetime: new Date(),

            })

            console.log(notification, "notification")

        }

        res.json({

            message: notification.content.message,

        });

    } catch (error) {
        console.error('Error al crear vehiculo:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }

}

const putVehicle = async (req, res = response) => {

    try {
        console.log('aqui ediamos vehiculo')

        const body = req.body;

        const { idvehicle, Updating } = body;

        const vehicle = await Vehicle.update(Updating, {
            where: { idvehicle: idvehicle },
        });

        // Notification

        const userLogged = await UserModel.findByPk(body.idUserLogged)

        let notification;

        let apartment = await ApartmentModel.findByPk(body.idApartment)


        if (body.idUserLogged && userLogged) {

            notification = await Notification.create({

                iduser: body.idUserLogged,
                type: 'warning',
                content: {
                    message: `Se modifico el vehiculo de placa ${vehicle.licenseplate}
                      ${apartment ? `del apartamento ${apartment.apartmentName}` : ''}
                     `,
                    information: { userLogged, apartment }
                },
                datetime: new Date(),

            })

        }


    } catch (error) {
        console.error('Error al modificar vehiculo:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
}

const deleteVehucle = async (req, res = response) => {
    const { idvehicle } = req.params;
    let message = '';

    try {
        const deletedRows = await Vehicle.destroy({
            where: { idvehicle: idvehicle },
        });

        if (deletedRows > 0) {
            message = 'Vehicle deleted successfully.';
        } else {
            message = 'No vehicle found with that ID';
        }
    } catch (error) {
        message = 'Error to delete vehicle: ' + error.message;
    }
    res.json({
        vehicle: message,
    });
}
module.exports = {
    getVehicle,
    postVehicle,
    putVehicle,
    deleteVehucle,
    getOneVehicleByAparment,
}