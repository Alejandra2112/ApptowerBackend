const { response } = require('express');
const ApartmentOwnerModel = require('../Models/apartment.owners.model');
const OwnersModel = require('../Models/owners.model');
const ApartmentModel = require('../Models/apartment.model');
const UserModel = require('../Models/users.model');
const Notification = require('../Models/notification.model');

const getOneApartmentOwners = async (req, res = response) => {
    try {
        const { idApartment } = req.params;

        const apartmentOwners = await ApartmentOwnerModel.findAll({
            where: { idApartment: idApartment },
        });


        const apartments = await ApartmentModel.findAll();

        const owners = await OwnersModel.findAll();

        const users = await UserModel.findAll();


        const data = apartmentOwners.map(ao => {

            const apartment = apartments.find(apartment => apartment.idApartment === ao.idApartment);
            const owner = owners.find(ow => ow.idOwner === ao.idOwner);
            const user = users.find(user => user.iduser === owner.iduser);


            return {
                ...ao.dataValues,
                apartment,
                owner: {

                    ...owner.dataValues,
                    user
                }
            }
        })

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Id apartment not found.' });
        }

        res.json({
            apartmentOwners: data,
        });
    } catch (error) {
        console.error('Error to get apartment.', error);
        res.status(500).json({
            error: 'Error to get apartment.',
        });
    }
};


const getAllApartmentOwners = async (req, res) => {

    try {

        const apartmentOwners = await ApartmentOwnerModel.findAll();

        const apartments = await ApartmentModel.findAll();

        const owners = await OwnersModel.findAll();

        const data = apartmentOwners.map(ao => {

            const apartment = apartments.find(apartment => apartment.idApartment === ao.idApartment);
            const owner = owners.find(ow => ow.idOwner === ao.idOwner);

            return {
                ...ao.dataValues,
                apartment,
                owner
            }
        })

        res.json({

            spaceOwners: data

        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error getting space owners' });

    }

}


const postApartmentOwner = async (req, res) => {


    let message = '';
    const body = req.body;

    console.log(body, 'body')

    try {

        await ApartmentOwnerModel.create(body);

        const owner = await OwnersModel.findOne({

            where: { idOwner: body.idOwner },
            include: [{
                model: UserModel,
                as: 'user'
            }]

        })

        const userLogged = await UserModel.findByPk(body.idUserLogged)

        let notification;
        let apartment = await ApartmentModel.findByPk(body.idApartment)


        if (body.idUserLogged && userLogged) {

            notification = await Notification.create({

                iduser: body.idUserLogged,
                type: 'success',
                content: {
                    message: `Se asigno a ${owner.user.name} ${owner.user.lastName}
                     ${apartment ? `como propietario del apartamento ${apartment.apartmentName}` : ''}
                    `,
                    information: { user: owner.user, userLogged, apartment }
                },
                datetime: new Date(),

            })

            console.log(notification, "notification")

        }

        res.json({

            message: notification.content.message,
            apartmentOwners: message,

        });

    } catch (error) {
        console.error('Error al asignar apartamento al propretario:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }

};


const putApartmentOwner = async (req, res = response) => {


    try {

        const body = req.body;

        const { idApartmentOwner, ...update } = body;

        const [updatedRows] = await ApartmentOwnerModel.update(update, {

            where: { idApartmentOwner: idApartmentOwner },

        });

        // Notification

        const userLogged = await UserModel.findByPk(body.idUserLogged)

        let notification;

        const owner = await OwnersModel.findOne({

            where: { idOwner: body.idOwner },
            include: [{
                model: UserModel,
                as: 'user'
            }]

        })

        let apartment = await ApartmentModel.findByPk(body.idApartment)


        if (body.idUserLogged && userLogged) {

            notification = await Notification.create({

                iduser: body.idUserLogged,
                type: 'warning',
                content: {
                    message: `Se modifico informacion del apartamento ${apartment.apartmentName},
                     ${update.status == 'Inactive' ? `${owner.user.name} ${owner.user.lastName} 
                     dejo de ser propietario del apartamento ${apartment.apartmentName}` : ''}`,
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
        console.error('Error al modificar apartamento al propretario:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }

};


const deleteApartmentOwner = async (req, res) => {

    const { idApartmentOwner } = req.body;
    let message = '';

    try {

        const rowsDeleted = await ApartmentOwnerModel.destroy({ where: { idApartmentOwner: idApartmentOwner } });

        if (rowsDeleted > 0) {

            message = 'Apartment owner delete ok.';

        } else {

            res.status(404).json({ error: 'Id apartment owner not found.' });

        }

    } catch (e) {

        res.status(500).json({ error: 'Error delete apartment owner.', message: e.message });
    }

    res.json({

        apartmentOwners: message,

    });
};


module.exports = {
    getOneApartmentOwners,
    getAllApartmentOwners,
    postApartmentOwner,
    putApartmentOwner,
    deleteApartmentOwner,
};
