const { response } = require('express');
const AssignedParkingModel = require('../Models/assigned.parking.model');
const ParkingSpaceModel = require('../Models/parking.spaces.model');
const SpaceModel = require('../Models/spaces.model');
const ApartmentModel = require('../Models/apartment.model');
const Notification = require('../Models/notification.model');
const UserModel = require('../Models/users.model');

const getApartmentWithAssignedParking = async (req, res = response) => {
    try {
        const { idApartment } = req.params;

        const assignedParking = await AssignedParkingModel.findAll({
            where: { idApartment: idApartment },
        });
        const parkingSpaces = await ParkingSpaceModel.findAll({
            attributes: ['idParkingSpace', 'parkingName', 'parkingType', 'status'],
        });

        const data = assignedParking.map(ap => {
            const parkingSpace = parkingSpaces.find(ps => ps.idParkingSpace === ap.idParkingSpace);

            return {
                ...ap.dataValues,
                parkingSpace
            }
        });

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Id apartment not found.' });
        }

        res.json({
            assignedParking: data,
        });
    } catch (error) {
        console.error('Error to get apartment.', error);
        res.status(500).json({
            error: 'Error to get apartment.',
        });
    }
};


const getAllAssignedParking = async (req, res) => {

    try {

        const assignedParkings = await AssignedParkingModel.findAll();

        const apartments = await ApartmentModel.findAll({
            attributes: ['idApartment', 'apartmentName', 'area', 'status']
        });

        const parkingSpaces = await ParkingSpaceModel.findAll({
            attributes: ['idParkingSpace', 'parkingName', 'parkingType', 'status'],
        });

        const data = assignedParkings.map(ap => {

            const apartment = apartments.find(at => at.idSpace === ap.idApartment);
            const parkingSpace = parkingSpaces.find(ps => ps.idParkingSpace === ap.idParkingSpace);

            return {
                ...ap.dataValues,
                apartment,
                parkingSpace
            }
        })

        res.json({

            parkingSpaces: data

        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error getting assigned parkings' });

    }

}


const postAssignedParking = async (req, res) => {

    try {

        const body = req.body;

        const parkingAssigned = await AssignedParkingModel.create(body);


        // Notification

        const userLogged = await UserModel.findByPk(body.idUserLogged)

        let notification;

        const parking = await ParkingSpaceModel.findOne({

            where: { idParkingSpace: body.idParkingSpace },

        })

        let apartment = await ApartmentModel.findByPk(body.idApartment)


        if (body.idUserLogged && userLogged) {

            notification = await Notification.create({

                iduser: body.idUserLogged,
                type: 'success',
                content: {
                    message: `Se asigno el parqueadero ${parking.parkingName}
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
        console.error('Error al asignar parqueadero al apartamento:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }

};


const putAssignedParking = async (req, res = response) => {


    try {

        const body = req.body;

        const { idAssignedParking, ...update } = body;

        const [updatedRows] = await AssignedParkingModel.update(update, {

            where: { idAssignedParking: idAssignedParking },

        });

        // Notification

        const userLogged = await UserModel.findByPk(body.idUserLogged)

        let notification;

        const parking = await ParkingSpaceModel.findOne({

            where: { idParkingSpace: body.idParkingSpace },

        })

        let apartment = await ApartmentModel.findByPk(body.idApartment)


        if (body.idUserLogged && userLogged) {

            notification = await Notification.create({

                iduser: body.idUserLogged,
                type: 'warning',
                content: {
                    message: `Se re asigno el parqueadero ${parking.parkingName}
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
        console.error('Error al modificar asignacion de parqueadero al apartamento:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }

}


const deleteAssignedParking = async (req, res) => {

    const { idAssignedParking } = req.body;
    let message = '';

    try {

        const rowsDeleted = await AssignedParkingModel.destroy({ where: { idAssignedParking: idAssignedParking } });

        if (rowsDeleted > 0) {

            message = 'Assigned parking delete ok.';

        } else {

            res.status(404).json({ error: 'Id assigned parking not found.' });

        }

    } catch (e) {

        res.status(500).json({ error: 'Error delete assigned parking.', message: e.message });
    }

    res.json({

        assignedParkings: message,

    });
};


module.exports = {
    getApartmentWithAssignedParking,
    getAllAssignedParking,
    postAssignedParking,
    putAssignedParking,
    deleteAssignedParking,
};
