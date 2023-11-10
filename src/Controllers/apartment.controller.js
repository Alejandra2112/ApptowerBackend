const { response } = require('express');
const ApartmentModel = require('../Models/apartment.model');

const getOneApartment = async (req, res = response) => {
    try {
        const { idApartment } = req.params;

        const spartment = await ApartmentModel.findOne({ where: { idApartment: idApartment } });

        if (!spartment) {
            return res.status(404).json({ error: 'Id apartment not found.' });
        }

        res.json({
            spartment,
        });
    } catch (error) {
        console.error('Error to get apartment.', error);
        res.status(500).json({
            error: 'Error to get apartment.',
        });
    }
};

const getAllApartment = async (req, res = response) => {

    try {

        const apartments = await ApartmentModel.findAll();

        console.log('Space get ok', apartments);

        res.json({ apartments });

    } catch (error) {

        console.error('Error to get apartments', error);

        res.status(500).json({
            error: 'Error to get apartments 500',
        })
    };

}


const postApartment = async (req, res) => {

    let message = '';
    const body = req.body;

    console.log(body)

    try {
        await ApartmentModel.create(body);
        message = 'New apartment created.';
    } catch (e) {
        message = e.message;
    }
    res.json({
        apartments: message,
    });
};


const putApartment = async (req, res = response) => {

    const body = req.body;
    let message = '';

    try {
        const { idApartment, ...update } = body;

        const [updatedRows] = await ApartmentModel.update(update, {
            where: { idApartment: idApartment },
        });

        if (updatedRows > 0) {

            message = 'Apartment updated successfully.';

        } else {

            message = 'Id apartment not found';

        }

    } catch (error) {

        message = 'Error updating apartment: ' + error.message;

    }
    res.json({

        apartments: message,

    });
};




module.exports = {
    getOneApartment,
    getAllApartment,
    postApartment,
    putApartment,
    // deleteSpace,
};
