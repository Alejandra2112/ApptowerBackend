const { response } = require('express');
const ResidentModel = require('../Models/resident.model');
const { upload, updateFile } = require('../Helpers/uploads.helpers');

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

const postResident = async (req, res) => {


    try {

        const imageUrl = await upload(req.files.pdf, ['pdf'], 'Documents')

        const { pdf, status, ...others } = req.body;

        console.log(pdf)
        console.log(status)
        console.log(imageUrl)


        const resident = await ResidentModel.create({
            pdf: imageUrl,
            status: 'Inactive',
            ...others
        })

        res.json({
            message: 'Resident created'
        })

        console.log(resident)

    } catch (e) {
        console.error('Error creating resident:', e);
        const message = e.message || 'Error creating resident.';
        res.status(500).json({ message });
    }
};

const putResident = async (req, res = response) => {

    try {
        const resident = await ResidentModel.findByPk(req.body.idResident);


        if (!resident) {
            return res.status(400).json({ msg: "Id resident not found." });
        }

        const newPdf = await updateFile(req.files, resident.pdf, ['pdf'], 'Documents' )
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
};
