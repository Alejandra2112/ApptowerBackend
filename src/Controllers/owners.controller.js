const { response } = require('express');
const OwnersModel = require('../Models/owners.model');
const { upload, updateFile } = require('../Helpers/uploads.helpers');
const ApartmentResidentModel = require('../Models/apartment.residents.model');
const ApartmentOwnerModel = require('../Models/apartment.owners.model');
const ResidentModel = require('../Models/resident.model');
const User = require('../Models/users.model');
const bcryptjs = require('bcryptjs');
const UserModel = require('../Models/users.model');
const ApartmentModel = require('../Models/apartment.model');
const Rols = require('../Models/rols.model');
const Notification = require('../Models/notification.model');



const getOneOwner = async (req, res = response) => {
    try {
        const { idOwner } = req.params;

        const owner = await OwnersModel.findOne({
            where: { idOwner: idOwner },
            include: [{
                model: UserModel,
                as: 'user'
            }]
        });

        const apartmentOwners = await ApartmentOwnerModel.findAll({

            where: { idOwner: idOwner },

        })

        const apartments = await ApartmentModel.findAll();

        const data = apartmentOwners.map(ao => {

            const apartment = apartments.find(apartment => apartment.idApartment === ao.idApartment);


            return {
                ...ao.dataValues,
                apartment,
            }
        })


        if (!owner) {
            return res.status(404).json({ error: 'Id no encontrado' });
        }

        res.json({
            owner,
            apartments: data
        });

    } catch (error) {
        console.error('Error to get owner.', error);
        res.status(500).json({
            error: 'Error to get owner.',
        });
    }
};

const getAllOwners = async (req, res = response) => {
    try {
        const owners = await OwnersModel.findAll({
            include: [
                {
                    model: UserModel,
                    as: 'user'
                },
            ]
        });

        const ownerList = await Promise.all(owners.map(async (owner) => {
            const apartmentOwners = await ApartmentOwnerModel.findAll({
                where: { idOwner: owner.idOwner },
            });

            const apartmentList = await Promise.all(apartmentOwners.map(async (apartment) => {
                const apartmentInfo = await ApartmentModel.findOne({
                    where: { idApartment: apartment.idApartment }
                });
                return apartmentInfo;
            }));

            owner.dataValues.apartments = apartmentList;
            owner.dataValues.apartmentOwners = apartmentOwners;

            return owner;
        }));

        res.json({
            owners: ownerList,
        });

    } catch (error) {
        console.error('Error al obtener propietarios:', error);
        res.status(500).json({
            error: 'Error al obtener propietarios',
        });
    }
};

const postOwner = async (req, res) => {


    try {

        const pdfUrl = await upload(req.files.pdf, ['pdf'], 'Documents')
        const imgUrl = await upload(req.files.userImg, ['png', 'jpg', 'jpeg'], 'Images')

        const { idUserLogged, pdf, isResident, ...userData } = req.body;

        const salt = bcryptjs.genSaltSync();
        userData.password = bcryptjs.hashSync(userData.password, salt);

        const user = await UserModel.create({
            pdf: pdfUrl,
            userImg: imgUrl,
            idrole: 1, // resident rol 
            password: userData.password,
            status: "Activo",
            ...userData

        })

        const owner = await OwnersModel.create({

            iduser: user.iduser,
            status: "Inactive"
        })


        const apartmentOwners = userData.idApartment ? await ApartmentOwnerModel.create({

            idApartment: userData.idApartment,
            idOwner: owner.idOwner,
            OwnershipStartDate: new Date()

        }) : ""

        let resident = null;
        let apartment;

        if (isResident === true || isResident === "true") {

            resident = await ResidentModel.create({

                iduser: user.iduser,
                residentType: 'owner',
                status: owner.status

            })

            await ApartmentResidentModel.create({

                idResident: resident.idResident,
                idApartment: userData.idApartment,
                residentStartDate: new Date()
            })

            apartment = await ApartmentModel.findByPk(userData.idApartment)

        }


        const roleData = await Rols.findByPk(userData.idrole);

        const userLogged = await UserModel.findByPk(idUserLogged)

        let notification;

        if (idUserLogged && user) {

            notification = await Notification.create({

                iduser: idUserLogged,
                type: 'success',
                content: {
                    message: `Se agrego un nuevo propietario ${user.name} ${user.lastName}
                     ${apartment ? `al apartamento ${apartment.apartmentName}` : ''}
                    `,
                    information: { user, userLogged }
                },
                datetime: new Date(),

            })

            console.log(notification, "notification")

            if (notification) {

                response.notification = notification;

            }
        }

        res.json({

            message: notification.content.message,
            user,
            role: roleData,
            msgResident: "Residente creado",
            owner,
            apartmentOwners,
            resident
        })




    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor hola', error: error.message });
    }
};

const putOwner = async (req, res = response) => {

    try {

        res.json({

            msg: "Aqui editaria un porpietario si tuviera un rol."

        })
        // const owner = await OwnersModel.findByPk(req.body.idOwner);


        // if (!owner) {
        //     return res.status(400).json({ msg: "Id owner not found." });
        // }

        // const newPdf = await updateFile(req.files, owner.pdf, ['pdf'], 'Documents')
        // const { pdf, ...others } = req.body

        // const updatedSpace = await owner.update({
        //     pdf: newPdf,
        //     ...others
        // }, {
        //     where: { idOwner: req.body.idOwner }
        // });

        // res.json({
        //     spaces: 'Owner update',
        //     // updatedSpace: updatedSpace.toJSON()
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};



// const deleteOwner = async (req, res) => {

//     const { idOwner } = req.body;
//     let message = '';

//     try {

//         const rowsDeleted = await OwnersModel.destroy({ where: { idOwner: idOwner } });

//         if (rowsDeleted > 0) {

//             message = 'Owner dalete ok';

//         } else {

//             res.status(404).json({ error: 'Id owner not found' });

//         }
//     } catch (e) {

//         res.status(500).json({ error: 'Error delete owner', message: e.message });

//     }
//     res.json({

//         owners: message,

//     });
// };


module.exports = {
    getOneOwner,
    getAllOwners,
    postOwner,
    putOwner,
    // deleteOwner,
};
