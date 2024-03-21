const Fines = require('../Models/fines.model');
const ApartmentModel = require('../Models/apartment.model');
const UsersModel = require('../Models/users.model');
const { response } = require('express');
const { upload, updateFile } = require('../Helpers/uploads.helpers');
const UserModel = require('../Models/users.model');
const Notification = require('../Models/notification.model');
const ApartmentResidentModel = require('../Models/apartment.residents.model');
const ResidentModel = require('../Models/resident.model');
const Mails = require('../Helpers/Mails');
const { GmailTransporter } = require('../Helpers/emailConfig');

const getFinesAll = async (req, res = response) => {
    try {
        const fines = await Fines.findAll({
            include: [
                {
                    model: ApartmentModel,
                    as: 'apartment',
                },
                { model: UsersModel, as: 'user' },
            ],
        });

        console.log('Multas obtenidas correctamente:', fines);

        res.json({
            fines,
        });
    } catch (error) {

        console.error('Error al obtener multas:', error);

        res.status(500).json({
            error: 'Error al obtener multas',
        });
    }
};

const getFinesOne = async (req, res = response) => {
    try {
        const { idfines } = req.params;

        const fines = await Fines.findOne(
            {
                where:
                    { idfines: idfines },
                include: [
                    { model: ApartmentModel, as: 'apartment' },
                    { model: UsersModel, as: 'user' },
                ]
            });

        if (!fines) {
            return res.status(404).json({ error: 'No se encontró una multa con ese ID' });
        }

        res.json({
            fines,
        });
    } catch (error) {
        console.error('Error al obtener multa:', error);
        res.status(500).json({
            error: 'Error al obtener multa',
        });
    }
}

const getFinesByApartment = async (req, res = response) => {
    try {
        const { idApartment } = req.params;

        const fines = await Fines.findAll({
            where: { idApartment: idApartment }, include: [{ model: ApartmentModel, as: 'apartment' },
            { model: UsersModel, as: 'user' },]
        });

        if (!fines) {
            return res.status(404).json({ error: 'No se encontró una multa con ese ID' });
        }

        res.json({
            fines,
        });
    } catch (error) {
        console.error('Error al obtener multa:', error);
        res.status(500).json({
            error: 'Error al obtener multa',
        });
    }


}

const postFines = async (req, res) => {
    let message = '';


    try {
        const images = req.files?.evidenceFiles;
        console.log("Tamaño", images ? images.length : 0); // Maneja el caso de un solo archivo
        const imagesArray = Array.isArray(images) ? images : [images];
        const imagesUrl = await Promise.all(imagesArray.map(async (file) => await upload(file, ['pdf', 'jpg', 'jpeg', 'png'], 'Evidences')))
        console.log(imagesUrl);


        const { iduser, idApartment, videnceFiles, ...finesAtributes } = req.body;
        const fine = await Fines.create({
            evidenceFiles: imagesUrl,
            idApartment: idApartment,
            idUser: iduser,
            ...finesAtributes,
        });

        // Notification

        const userLogged = await UserModel.findByPk(iduser)

        let notification;

        let apartment = await ApartmentModel.findByPk(idApartment)

        const residents = await ApartmentResidentModel.findAll({
            where: { idApartment: idApartment, status: 'Active' },
            include: [
                {
                    model: ResidentModel,
                    as: 'resident',
                    include: [
                        {
                            model: UserModel,
                            as: 'user',
                        },
                    ],
                },
            ],
        })

        // Notification funtions

        if (iduser && userLogged) {

            notification = await Notification.create({

                iduser: iduser,
                type: 'success',
                content: {
                    message: `Se multo al apartamento ${apartment.apartmentName}
                    por motivo de ${fine.fineType}`,
                    information: { userLogged, fine, resident: residents }
                },
                datetime: new Date(),

            })

        }

        // Send email
        let mailsToSend = [];

        if (residents) {
            mailsToSend = residents.map((resident) => {
                return Mails.fineEmail(
                    resident?.resident?.user?.name,
                    resident?.resident?.user?.lastName,
                    resident?.resident?.user?.email,
                    fine, apartment
                );
            });
        }

        console.log(mailsToSend, 'mailsToSend');

        mailsToSend.forEach((mail) => {
            GmailTransporter.sendMail(mail, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    res.status(500).json({ message: 'Error al enviar el correo' });
                } else {
                    console.log('Correo enviado:', info.response);
                    res.json({ message: 'Correo con código de recuperación enviado' });
                }
            });
        });




        res.json({

            message: notification.content.message,

        });


    } catch (error) {
        console.error('Error al crear multa:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }

};


const putFines = async (req, res = response) => {
    try {
        const { idUserLogged, idfines, state } = req.body;
        console.log("Esto es lo que se envia body" + req.body)

        const fine = await Fines.findOne({ where: { idfines: idfines } });

        if (!fine) {
            return res.status(404).json({ message: 'No se encontró una multa con ese ID' });
        }

        // Notification

        console.log(idUserLogged)

        const userLogged = await UserModel.findByPk(idUserLogged)

        let notification;

        let apartment = await ApartmentModel.findByPk(fine.idApartment)

        const residents = await ApartmentResidentModel.findAll({
            where: { idApartment: fine.idApartment },
            include: [
                {
                    model: ResidentModel,
                    as: 'resident',
                    include: [
                        {
                            model: UserModel,
                            as: 'user',
                        },
                    ],
                },
            ],
        })


        if (userLogged) {

            notification = await Notification.create({

                iduser: idUserLogged,
                type: 'info',
                content: {
                    message: `Se agrega comprobante de pago a una multa del apartamento ${apartment.apartmentName}
                por motivo de ${fine.fineType}`,
                    information: { userLogged, fine, resident: residents }
                },
                datetime: new Date(),

            })

        }



        let results;

        if (req.files && req.files.paymentproof) {


            const newImg = fine.paymentproof == "" && req.files ?
                await upload(req.files.paymentproof, ['png', 'jpg', 'jpeg', 'pdf'], 'Images') :
                req.files ? await updateFile(req.files, fine.paymentproof, ['png', 'jpg', 'jpeg', 'pdf'], 'Images', "paymentproof") : ""

            results = await fine.update({
                state: state,
                paymentproof: newImg == "" ? req.files.paymentproof : newImg,
            }, { where: { idfines: idfines } });

            // Send email

            const admins = await UserModel.findAll({ where: { idrole: 1 } }) // Rol de administrador

            console.log(admins, 'admins')

            // Send email 
            let mailsToSend = [];

            if (admins) {
                mailsToSend = admins?.map((admin) => {
                    return Mails.proofFineEmail(
                        admin?.name,
                        admin?.lastName,
                        admin?.email,
                        fine
                    );
                });
            }

            console.log(mailsToSend, 'mailsToSend');

            mailsToSend.forEach((mail) => {
                GmailTransporter.sendMail(mail, (error, info) => {
                    if (error) {
                        console.error('Error al enviar el correo:', error);
                        res.status(500).json({ message: 'Error al enviar el correo' });
                    } else {
                        console.log('Correo enviado:', info.response);
                        res.json({ message: 'Correo con código de recuperación enviado' });
                    }
                });
            });


            res.json({
                message: 'jeje',
                results,
            });
        } else {
            results = await fine.update({
                state: state,
            }, { where: { idfines: idfines } });



            // Send email to apartment residents

            const userLogged = await UserModel.findByPk(req.body.idUserLogged)


            console.log(userLogged, 'userLogged', req.body.idUserLogged)
            const residents = await ApartmentResidentModel.findAll({
                where: { idApartment: fine.idApartment, status: 'Active' },
                include: [
                    {
                        model: ResidentModel,
                        as: 'resident',
                        include: [
                            {
                                model: UserModel,
                                as: 'user',
                            },
                        ],
                    },
                ],
            })

            notification = await Notification.create({

                iduser: req.idUserLogged,
                type: 'info',
                content: {
                    message: `Se cambio el estado de la multa del apartamento ${apartment.apartmentName}
                como ${fine.state}`,
                    information: { userLogged, fine, resident: residents }
                },
                datetime: new Date(),

            })

            let mailsToSend = [];

            if (residents) {
                mailsToSend = residents?.map((resident) => {
                    return Mails.payFineEmail(

                        resident?.resident?.user?.name,
                        resident?.resident?.user?.lastName,
                        resident?.resident?.user?.email,
                        fine,

                    );
                });
            }

            console.log(mailsToSend, 'mailsToSend');

            mailsToSend.forEach((mail) => {
                GmailTransporter.sendMail(mail, (error, info) => {
                    if (error) {
                        console.error('Error al enviar el correo:', error);
                        res.status(500).json({ message: 'Error al enviar el correo' });
                    } else {
                        console.log('Correo enviado:', info.response);
                        res.json({ message: 'Correo con código de recuperación enviado' });
                    }
                });
            });


            res.json({
                message: 'jeje',
                results,
            });
        }

    } catch (error) {
        console.error('Error al modificar multa:', error);
        res.status(500).json({
            error: error.message,
        });
    }
};




module.exports = {
    getFinesAll,
    getFinesOne,
    getFinesByApartment,
    postFines,
    putFines,
};