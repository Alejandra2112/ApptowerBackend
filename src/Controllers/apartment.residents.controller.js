const { response } = require('express');
const ResidentsModel = require('../Models/resident.model');
const ApartmentResidentModel = require('../Models/apartment.residents.model');
const ApartmentModel = require('../Models/apartment.model');
const UserModel = require('../Models/users.model');
const TowerModel = require('../Models/tower.model');
const Notification = require('../Models/notification.model');

const getOneApartmentResidents = async (req, res = response) => {
    try {
        const { idApartment } = req.params;

        const apartmentResidents = await ApartmentResidentModel.findAll({
            where: { idApartment: idApartment }
        });

        const apartments = await ApartmentModel.findAll();

        const residents = await ResidentsModel.findAll();

        const users = await UserModel.findAll();

        const towers = await TowerModel.findAll();


        const data = apartmentResidents.map(ar => {

            const apartment = apartments.find(apartment => apartment.idApartment === ar.idApartment);
            const tower = towers.find(tower => tower.idTower === apartment.idTower)

            const resident = residents.find(resident => resident.idResident === ar.idResident);
            const user = users.find(user => user.iduser === resident.iduser);


            return {
                ...ar.dataValues,
                apartment: {
                    ...apartment.dataValues,
                    tower
                },
                resident: {
                    ...resident.dataValues,
                    user
                }
            }
        })

        res.json({

            apartmentResidents: data

        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error al obtener residentes por apartamento' });

    }
};




const getAllApartmentResidents = async (req, res) => {

    try {

        const apartmentResidents = await ApartmentResidentModel.findAll();

        const apartments = await ApartmentModel.findAll();

        const residents = await ResidentsModel.findAll();

        const users = await UserModel.findAll();

        const towers = await TowerModel.findAll();


        const data = apartmentResidents.map(ar => {

            const apartment = apartments.find(apartment => apartment.idApartment === ar.idApartment);
            const tower = towers.find(tower => tower.idTower === apartment.idTower)

            const resident = residents.find(resident => resident.idResident === ar.idResident);
            const user = users.find(user => user.iduser === resident.iduser);


            return {
                ...ar.dataValues,
                apartment: {
                    ...apartment.dataValues,
                    tower
                },
                resident: {
                    ...resident.dataValues,
                    user
                }
            }
        })

        res.json({

            apartmentResidents: data

        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error al obtener residentes por apartamento' });

    }

}


const getApartmentsResidents = async (req, res = response) => {
    try {
        const { idResident } = req.params;

        const apartmentResidents = await ApartmentResidentModel.findOne({ where: { idResident: idResident } });

        if (!apartmentResidents) {
            return res.status(404).json({ error: 'No se encontró un ID' });
        }

        res.json({
            apartmentResidents,
        });
    } catch (error) {
        console.error('Error al obtener resident:', error);
        res.status(500).json({
            error: 'Error al obtener resident',
        });
    }
};



const postApartmentResident = async (req, res) => {


    try {


        const body = req.body;

        console.log(body)

        await ApartmentResidentModel.create(body);

        const resident = await ResidentsModel.findOne({

            where: { idResident: body.idResident },
            include: [{
                model: UserModel,
                as: 'user'
            }]

        })

        // Notification

        const userLogged = await UserModel.findByPk(body.idUserLogged)

        let notification;
        let apartment = await ApartmentModel.findByPk(body.idApartment)


        if (body.idUserLogged && userLogged) {

            notification = await Notification.create({

                iduser: body.idUserLogged,
                type: 'success',
                content: {
                    message: `Se agrego a ${resident.user.name} ${resident.user.lastName}
                     ${apartment ? `como residente del apartamento ${apartment.apartmentName}` : ''}
                    `,
                    information: { user: resident.user, userLogged, apartment }
                },
                datetime: new Date(),

            })
        }

        res.json({

            message: notification.content.message,

        });

    } catch (error) {
        console.error('Error al asignar residente al apartamento:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }

};


const putApartmentResident = async (req, res = response) => {

    const body = req.body;
    let message = '';

    try {
        const { idApartmentResident, ...update } = body;

        const [updatedRows] = await ApartmentResidentModel.update(update, {
            where: { idApartmentResident: idApartmentResident },
        });

        // Notification

        const userLogged = await UserModel.findByPk(body.idUserLogged)

        let notification;

        const resident = await ResidentsModel.findOne({

            where: { idResident: body.idResident },
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
                    message: `Se modifico residencia de ${resident.user.name} ${resident.user.lastName}
                     ${apartment ? `como residente del apartamento ${apartment.apartmentName}` : ''}
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
        console.error('Error al modificar residente del apartamento:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }

}



const deleteApartmentResident = async (req, res) => {

    const { idApartmentResident } = req.body;
    let message = '';

    try {

        const rowsDeleted = await ApartmentResidentModel.destroy({ where: { idApartmentResident: idApartmentResident } });

        if (rowsDeleted > 0) {

            message = 'Apartment resident dalete ok';

        } else {

            res.status(404).json({ error: 'Id apartment resident not found' });

        }
    } catch (e) {

        res.status(500).json({ error: 'Error delete apartment resident', message: e.message });

    }
    res.json({

        spaceResidents: message,

    });
};


module.exports = {
    getOneApartmentResidents,
    getAllApartmentResidents,
    postApartmentResident,
    putApartmentResident,
    deleteApartmentResident,
    getApartmentsResidents
};
