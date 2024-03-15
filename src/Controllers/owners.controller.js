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
const { where } = require('sequelize');
const Mails = require('../Helpers/Mails');
const { GmailTransporter } = require('../Helpers/emailConfig');



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
            ],
            order: [
                ['idOwner', 'DESC'] // Ordenando por el ID en orden descendente
            ]
        });

        const ownerList = await Promise.all(owners.map(async (owner) => {
            const apartmentOwners = await ApartmentOwnerModel.findAll({
                where: { idOwner: owner.idOwner, status: 'Active' },
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



        passwordOrinignal = userData.password;

        passwordOrinignal = userData.name.charAt(0).toUpperCase() + userData.lastName.charAt(0).toLowerCase() + userData.document + '*';

        const salt = bcryptjs.genSaltSync();
        userData.password = bcryptjs.hashSync(passwordOrinignal, salt);

        const user = await UserModel.create({
            pdf: pdfUrl,
            userImg: imgUrl,
            idrole: 2, // resident rol 
            password: userData.password,
            status: "Inactivo",

            ...userData

        })

        // Email funtion

        if (user) {
            const mailOptions = Mails.changedStatusEmail(user.name, user.lastName, user.email, user.email,
            );

            GmailTransporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    res.status(500).json({ message: 'Error al enviar el correo' });
                } else {
                    console.log('Correo enviado:', info.response);
                    res.json({ message: 'Correo con código de recuperación enviado' });
                }
            });
        }

        // const salt = bcryptjs.genSaltSync();
        // userData.password = bcryptjs.hashSync(userData.password, salt);




        // const user = await UserModel.create({
        //     pdf: pdfUrl,
        //     userImg: imgUrl,
        //     idrole: 2, // resident rol 
        //     password: userData.password,
        //     status: "Inactivo",
        //     ...userData

        // })

        const owner = await OwnersModel.create({

            iduser: user.iduser,
            status: 'Inactive' // Create owner inactive

        })

        console.log(userData.idApartment, 'userData.idApartment')

        const apartmentOwners = userData.idApartment ? await ApartmentOwnerModel.create({

            idApartment: userData.idApartment,
            idOwner: owner.idOwner,
            OwnershipStartDate: userData.OwnershipStartDate

        }) : ""

        let resident = null;
        const apartment = await ApartmentModel.findByPk(userData.idApartment)

        if (isResident === true || isResident === "true") {

            resident = await ResidentModel.create({

                iduser: user.iduser,
                residentType: 'owner',
                status: owner.status

            })

            await ApartmentResidentModel.create({

                idResident: resident.idResident,
                idApartment: userData.idApartment,
                residentStartDate: userData.OwnershipStartDate
            })


        }


        const roleData = await Rols.findByPk(userData.idrole);

        const userLogged = await UserModel.findByPk(idUserLogged)

        let notification;

        if (idUserLogged && user) {

            notification = await Notification.create({

                iduser: idUserLogged,
                type: 'success',
                content: {
                    message: `Se agrego a ${user.name} ${user.lastName} como propietario
                    ${resident ? ` y residente ` : ''}
                    ${apartment ? `del apartamento ${apartment.apartmentName}` : ''}`,
                    information: { user, userLogged, apartment }
                },
                datetime: new Date(),

            })

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
        const { idOwner, idUserLogged } = req.body;

        const owner = await OwnersModel.findOne({ where: { idOwner: idOwner } });
        const user = await UserModel.findOne({ where: { iduser: owner.iduser } });

        // const resident = await ResidentModel.findOne({ where: { iduser: owner.iduser } });

        let ownerUpdated;
        let message;

        if (owner.status == 'Active') {

            ownerUpdated = await owner.update({ status: 'Inactive' });
            message = `Se desactivo el propietario ${user.name} ${user.lastName}. ya no es parte del conjunto residencial.`;

            // await user.update({ status: 'Inactivo' });

            // if (resident) { // Verificar si el residente existe
            //     await resident.update({ status: 'Inactive' });
            // }

        } else if (owner.status == 'Inactive') {

            ownerUpdated = await owner.update({ status: 'Active' });
            message = `Se reestablecio a ${user.name} ${user.lastName} como propietario.`;

            // await user.update({ status: 'Activo' });

            // if (resident) { // Verificar si el residente existe
            //     await resident.update({ status: 'Active' });
            // }

            
        }

        const userLogged = await UserModel.findByPk(idUserLogged);

        let notification;

        if (idUserLogged && user) {
            notification = await Notification.create({
                iduser: idUserLogged,
                type: ownerUpdated.status == 'Inactive' ? 'danger' : 'success',
                content: {  
                    message: `${message}`,
                    information: { user, userLogged, owner }
                },
                datetime: new Date(),
            });

            res.json({ message: notification.content.message });
        }
    } catch (error) {
        console.error('Error al modificar propietario:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
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
