const Fines = require('../Models/fines.model');
const ApartmentModel = require('../Models/apartment.model');
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

        const fines = await Fines.findOne({ where: { idfines: idfines }, include: [{ model: ApartmentModel, as: 'apartment' }] });

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

        const fines = await Fines.findAll({ where: { idApartment: idApartment }, include: [{ model: ApartmentModel, as: 'apartment' }] });

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
        const imageUrl = await upload(req.files.evidenceFiles, ['pdf','jpg','jpeg','png'], 'Evidences')
        console.log(imageUrl);
        const {evidenceFiles, ...finesAtributes } = req.body;
        await Fines.create({
            evidenceFiles: imageUrl,
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
    const body = req.body;
    let message = '';

    try {
        const { idfines, state, paymentproof } = body;

        const [updatedRows] = await Fines.update({
            state: state,
            paymentproof: paymentproof
        
        }, {
            where: { idfines: idfines },
        });

        if (updatedRows > 0) {
            message = 'Multa modificada exitosamente.';
        } else {
            message = 'No se encontró una multa con ese ID';
        }
    } catch (error) {
        message = 'Error al modificar multa: ' + error.message;
    }
    res.json({
        fines: message,
    });
};


module.exports = {
    getFinesAll,
    getFinesOne,
    getFinesByApartment,
    postFines,
    putFines,
};