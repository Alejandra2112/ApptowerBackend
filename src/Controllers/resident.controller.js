const { response } = require('express');
const ResidentModel = require('../Models/resident.model');
const { upload, updateFile } = require('../Helpers/uploads.helpers');
const ApartmentResidentModel = require('../Models/apartment.residents.model');
const { body } = require('express-validator');
const bcryptjs = require('bcryptjs')
const UserModel = require('../Models/users.model');
const Rols = require('../Models/rols.model');
const ApartmentModel = require('../Models/apartment.model');
const OwnersModel = require('../Models/owners.model');
const ApartmentOwnerModel = require('../Models/apartment.owners.model');
const { hotmailTransporter } = require('../Helpers/emailConfig');
const Mails = require('../Helpers/Mails');

const getOneResidents = async (req, res = response) => {
    try {
        const { idResident } = req.params;

        const resident = await ResidentModel.findOne(
            {
                where: { idResident: idResident },

                include: [{

                    model: UserModel,
                    as: "user"
                }]
            }

        );

        const apartmentResidents = await ApartmentResidentModel.findAll({

            where: { idResident: idResident },

        })

        const apartments = await ApartmentModel.findAll();

        const data = apartmentResidents.map(ao => {

            const apartment = apartments.find(apartment => apartment.idApartment === ao.idApartment);


            return {
                ...ao.dataValues,
                apartment,
            }
        })

        if (!resident) {
            return res.status(404).json({ error: 'Id residente no esta encontrado' });
        }



        res.json({
            resident,
            apartments: data

        });

    } catch (error) {
        console.error('Error al obtener residente:', error);
        res.status(500).json({
            error: 'Error al obtener residente',
        });
    }
};


const getAllResidents = async (req, res = response) => {
    try {
        const residents = await ResidentModel.findAll({
            include: [
                {
                    model: UserModel,
                    as: 'user'
                },
            ]
        });

        const residentList = await Promise.all(residents.map(async (resident) => {
            const apartmentResidents = await ApartmentResidentModel.findAll({
                where: { idResident: resident.idResident },
            });

            const apartmentList = await Promise.all(apartmentResidents.map(async (apartment) => {
                const apartmentInfo = await ApartmentModel.findOne({
                    where: { idApartment: apartment.idApartment }
                });
                console.log(apartmentInfo);
                return apartmentInfo;
            }));

            resident.dataValues.apartments = apartmentList;
            resident.dataValues.apartmentResidents = apartmentResidents;

            return resident;
        }));

        res.json({
            residents: residentList,
        });

    } catch (error) {
        console.error('Error al obtener residentes:', error);
        res.status(500).json({
            error: 'Error al obtener residentes',
        });
    }
};









const postResident = async (req, res) => {

    try {

        const pdfUrl = req.files !== null ? await upload(req.files.pdf, ['pdf'], 'Documents') : null
        const imgUrl = req.files !== null ? await upload(req.files.userImg, ['png', 'jpg', 'jpeg'], 'Images') : null

        const { pdf, password, idApartment, ...userData } = req.body;
        console.log(userData, 'userData en back')
        const idApartmentNumber = Number(idApartment);

        const salt = bcryptjs.genSaltSync();
        userData.password = bcryptjs.hashSync(userData.password, salt);

        const user = await UserModel.create({
            pdf: pdfUrl,
            userImg: imgUrl,
            password: password,
            status: "Activo",
            ...userData

        })

        const resident = await ResidentModel.create({

            iduser: user.iduser,
            residentType: userData.residentType,
            status: "Inactive"
        })


        const apartmentResident = userData.idApartment ? await ApartmentResidentModel.create({

            idApartment: idApartmentNumber,
            idResident: resident.idResident,
            residentStartDate: userData.residentStartDate

        }) : ""

        const roleData = await Rols.findByPk(userData.idrole);

        res.json({

            msgUser: "Usuario creado",
            user,
            role: roleData,
            msgResident: "Residente creado",
            resident,
            apartmentResident
        })




    } catch (error) {
        console.error('Error al crear usuario:', error);
        console.error(error.stack); // This will print the stack trace
        return res.status(500).json({ message: 'Error interno del servidor hola', error: error.message });
    }

};




const putResident = async (req, res = response) => {

    try {

        const { idResident, idApartment, ...residentAtributes } = req.body


        const resident = await ResidentModel.findOne(
            {
                where: { idResident: idResident },

                // include: [{

                //     model: UserModel,
                //     as: "user"
                // }]
            }

        );

        if (!resident) {
            return res.status(400).json({ msg: "Residente no encontrado." });
        }

        console.log(resident)


        // const newOwner = resident.residentType != "owner" && residentAtributes.residentType == "owner" ?
        //     await OwnersModel.create({
        //         iduser: resident.iduser,
        //         ...residentAtributes
        //     }) : ""

        let newOwner = "";

        if (resident.residentType != "owner" && residentAtributes.residentType == "owner") {
            newOwner = await OwnersModel.create({
                iduser: resident.iduser,
                ...residentAtributes
            });

            console.log(idApartment, "id apartamento");

            if (idApartment != "") {
                await ApartmentOwnerModel.create({
                    idOwner: newOwner.idOwner,
                    idApartment: idApartment,
                    OwnershipStartDate: new Date(),
                    status: "Active"
                });
            }
        }


        const updatedResident = await resident.update({

            residentType: residentAtributes.residentType,
            status: residentAtributes.status,

        });

        res.json({

            resident: updatedResident,
            newOwner

        })


    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al editar residente" });
    }
};


// const deleteResident = async (req, res) => {

//     const { idResident } = req.body;
//     let message = '';

//     try {

//         const rowsDeleted = await ResidentModel.destroy({ where: { idResident: idResident } });

//         if (rowsDeleted > 0) {

//             message = 'Resident dalete ok';

//         } else {

//             res.status(404).json({ error: 'Id resident not found' });

//         }
//     } catch (e) {

//         res.status(500).json({ error: 'Error delete resident', message: e.message });

//     }
//     res.json({

//         residents: message,

//     });
// };

// const getResidentDocument = async (req, res = response) => {
//     try {
//         const document = req.params.document;

//         const residente = await ResidentModel.findOne({ where: { docNumber: document } });
//         console.log('Residente obtenido correctamente:', residente);

//         if (!residente) {
//             return res.status(404).json({ error: 'No se encontró un residente con ese documento' });
//         }

//         res.json({
//             residente,
//         });
//     } catch (error) {
//         console.error('Error al obtener residente:', error);
//         res.status(500).json({
//             error: 'Error al obtener residente',
//             errorMessage: error.toString(), // Cambia esto
//         });
//     }
// }


module.exports = {
    getOneResidents,
    getAllResidents,
    postResident,
    putResident,
    // deleteResident,
    // getResidentDocument
};
