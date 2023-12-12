const { response } = require('express');
const ResidentModel = require('../Models/resident.model');
const { upload, updateFile } = require('../Helpers/uploads.helpers');
const ApartmentResidentModel = require('../Models/apartment.residents.model');
const User = require('../Models/users.model');
const { body } = require('express-validator');
const bcryptjs = require('bcryptjs')


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

        console.error('Error to get space.', error);
        res.status(500).json({

            error: 'Error to get space.',

        });
    }
};

const getAllResidents = async (req, res = response) => {
    try {

        const residents = await ResidentModel.findAll();

        console.log('Resident get ok', residents);

        res.json({

            residents,

        });

    } catch (error) {

        console.error('Error to get residents', error);

        res.status(500).json({

            error: 'Error to get residents 500',

        })
    };

}


const getResidentDocument = async (req, res = response) => {
    try {
        const document = req.params.document;

        const residente = await ResidentModel.findOne({ where: { docNumber: document } });
        console.log('Residente obtenido correctamente:', residente);

        if (!residente) {
            return res.status(404).json({ error: 'No se encontró un residente con ese documento' });
        }

        res.json({
            residente,
        });
    } catch (error) {
        console.error('Error al obtener residente:', error);
        res.status(500).json({
            error: 'Error al obtener residente',
            errorMessage: error.toString(), // Cambia esto
        });
    }
}



const postResident = async (req, res) => {
    try {
        const imageUrl = await upload(req.files.pdf, ['pdf'], 'Documents')

        const {
            idApartment,
            residentStartDate,
            residentEndDate,
            userBool,
            ...residentAttributes
        } = req.body;

        // Criptar contraseña 
        const salt = bcryptjs.genSaltSync();
        residentAttributes.password = bcryptjs.hashSync(residentAttributes.password, salt);

        // create resident 
        const resident = await ResidentModel.create({
            pdf: imageUrl,
            residentType: residentAttributes.residentType = "tenant",
            status: residentAttributes.status = 'Inactive',
            ...residentAttributes,
        });

        // create user with rol redent
        let user;
        if (userBool === "true") {
            user = await User.create({
                documentType: resident.docType,
                document: resident.docNumber,
                lastname: resident.lastName,
                phone: resident.phoneNumber,
                password: residentAttributes.password,
                idrole: 2,
                ...residentAttributes
            });
        }

        // Create apartment per resident 

        if (idApartment) {
            const apartmentResident = await ApartmentResidentModel.create({
                idApartment,
                idResident: resident.idResident,
                residentStartDate
            });

            res.json({
                messageResident: 'Resident created',
                resident,
                messageUser: 'User created',
                user,
                apartmentResidentMessage: 'Apartment resident created',
                apartmentResident,
            });
        } else {
            res.json({
                messageResident: 'Resident created',
                resident,
                messageUser: 'User created',
                user,
            });
        }

    } catch (e) {
        console.error('Error creating resident:', e);
        res.status(500).json({ message: e.message, stack: e.stack });
    }
};



const putResident = async (req, res = response) => {

    try {

        console.log(`Editar:` )
        console.log(req.body)

        const resident = await ResidentModel.findByPk(req.body.idResident);


        if (!resident) {
            return res.status(400).json({ msg: "Id resident not found." });
        }

        const newPdf = await updateFile(req.files, resident.pdf, ['pdf'], 'Documents')
        const { pdf, ...others } = req.body

        const updatedSpace = await resident.update({
            pdf: newPdf,
            ...others
        }, {
            where: { idResident: req.body.idResident }
        });

        res.json({
            spaces: 'Resident update',
            // updatedSpace: updatedSpace.toJSON()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


const deleteResident = async (req, res) => {

    const { idResident } = req.body;
    let message = '';

    try {

        const rowsDeleted = await ResidentModel.destroy({ where: { idResident: idResident } });

        if (rowsDeleted > 0) {

            message = 'Resident dalete ok';

        } else {

            res.status(404).json({ error: 'Id resident not found' });

        }
    } catch (e) {

        res.status(500).json({ error: 'Error delete resident', message: e.message });

    }
    res.json({

        residents: message,

    });
};


module.exports = {
    getOneResidents,
    getAllResidents,
    postResident,
    putResident,
    deleteResident,
    getResidentDocument
};
