const Fines = require('../Models/fines.model');
const ApartmentModel = require('../Models/apartment.model');
const UsersModel = require('../Models/users.model');
const { response } = require('express');
const { upload, updateFile } = require('../Helpers/uploads.helpers');

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
            { where:
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

        const fines = await Fines.findAll({ where: { idApartment: idApartment }, include: [{ model: ApartmentModel, as: 'apartment' },
        { model: UsersModel, as: 'user' },] });

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
        const images = req.files.evidenceFiles;
        console.log("Tamaño", images ? images.length : 0); // Maneja el caso de un solo archivo
        const imagesArray = Array.isArray(images) ? images : [images];
        const imagesUrl = await Promise.all(imagesArray.map(async(file)  => await upload(file, ['pdf','jpg','jpeg','png'], 'Evidences')))
        console.log(imagesUrl);
        const {evidenceFiles, ...finesAtributes } = req.body;
        await Fines.create({
            evidenceFiles: imagesUrl,
            ...finesAtributes,
        });
        message = 'Multa Registrada Exitosamente';
    } catch (e) {
        message = e.message;
    }
    res.json({
        fines: message,
    });
};


const putFines = async (req, res = response) => {
    try {
        const { idfines, state} = req.body;
        console.log("Esto es lo que se envia body"+req.body)

        const fine = await Fines.findOne({ where: { idfines: idfines } });

        if (!fine) {
            return res.status(404).json({ message: 'No se encontró una multa con ese ID' });
        }

        let results;

        if (req.files && req.files.paymentproof) {
            const newImg = fine.paymentproof == "" || fine.paymentproof == null ?
                await upload(req.files.paymentproof, ['png', 'jpg', 'jpeg', 'pdf'], 'Images') :
                await updateFile(req.files, fine.paymentproof, ['png', 'jpg', 'jpeg', 'pdf'], 'Images');

            results = await fine.update({
                state: state,
                paymentproof: newImg,
            }, { where: { idfines: idfines } });

            res.json({
                message: 'Multa modificada exitosamente con archivo.',
                results,
            });
        } else {
            results = await fine.update({
                state: state,
            }, { where: { idfines: idfines } });

            res.json({
                message: 'Multa modificada exitosamente sin archivo.',
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