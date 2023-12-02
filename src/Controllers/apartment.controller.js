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

    const { tower, apartmentsFloor, floorNumber, ...others } = body

    // console.log("Apartments per floor: " + apartmentsFloor)
    // console.log("Floor number: " + floorNumber)

    try {

        let newAparments = 0;

        for (let floor = 1; floor <= floorNumber; floor++) {

            console.log(newAparments)

            for (let apartmentNumber = 1; apartmentNumber <= apartmentsFloor; apartmentNumber++) {
                newAparments++
                await ApartmentModel.create({

                    tower: tower,
                    apartmentName: (apartmentNumber < 10) ? `${floor}0${apartmentNumber}` : `${floor}${apartmentNumber}`,
                    ...others

                });

                console.log(`creado: ${newAparments}`)


            }

        }

        message = `Creaste ${newAparments} apartamentos en la torre ${tower}.`;

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
