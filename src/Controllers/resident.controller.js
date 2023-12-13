const { response } = require('express');
const ResidentModel = require('../Models/resident.model');
const { upload, updateFile } = require('../Helpers/uploads.helpers');
const ApartmentResidentModel = require('../Models/apartment.residents.model');
const { body } = require('express-validator');
const bcryptjs = require('bcryptjs');
const UserModel = require('../Models/users.model');


const getOneResidents = async (req, res = response) => {
    try {

        const { idResident } = req.params;

        const resident = await ResidentModel.findOne({ where: { idResident: idResident } });

        if (!resident) {
            return res.status(404).json({ error: 'Id resident not found.' });
        }

        res.json({
            resident,
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

        const residents = await ResidentModel.findAll();

        res.json({

            residents,

        });

    } catch (error) {

        console.error('Error al obtener residentes:', error);

        res.status(500).json({

            error: 'Error al obtener residentes',

        })
    };

}






const postResident = async (req, res) => {

    try {

        // const pdfUrl = await upload(req.files.pdf, ['pdf'], 'Documents')
        // const imgUrl = await upload(req.files.userImg, ['png', 'jpg', 'jpeg'], 'Images')

        // const { pdf, userImg,  ...userAtributes } = req.body;

        // const user = await UserModel.create({
            
        //     pdf: pdfUrl,
        //     userImg: imgUrl,
        //     idrole: 2, // resident rol 
        //     ...userAtributes

        // })

        // const resident = await ResidentModel.create({

        //     idUser: user.idUser,
        //     residentType: "tenant",
        //     status: "Inactive"

        // })
        
        res.json({

            msg: "Aqui vamos a crear un residente si tuviera un rol",
            msgUser: "Usurio creado",
            // user,
            msgResident: "Residente Creado",
            // resident

        })


        } catch (e) {
            console.error('Error creado residente :', e);
            res.status(500).json({ message: e.message, stack: e.stack });
        }
    };



    const putResident = async (req, res = response) => {

        try {

            res.json({

                msg: 'Editar residente'
            })

            // console.log(`Editar:` )
            // console.log(req.body)

            // const resident = await ResidentModel.findByPk(req.body.idResident);


            // if (!resident) {
            //     return res.status(400).json({ msg: "Id resident not found." });
            // }

            // const newPdf = await updateFile(req.files, resident.pdf, ['pdf'], 'Documents')
            // const { pdf, ...others } = req.body

            // const updatedSpace = await resident.update({
            //     pdf: newPdf,
            //     ...others
            // }, {
            //     where: { idResident: req.body.idResident }
            // });

            // res.json({
            //     spaces: 'Resident update',
            //     // updatedSpace: updatedSpace.toJSON()
            // });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
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
