const { response } = require('express');
const ParkingSpacesModel = require('../Models/parking.spaces.model');
const GuestIncomeParking = require('../Models/guestIncomeParking.model');
const { where } = require('sequelize');
const AssignedParking = require('../Models/assigned.parking.model');
const Vehicle = require('../Models/vehicle.model');
const ApartmentModel = require('../Models/apartment.model');
const Guest_income = require('../Models/guest.income.model');

const getOneParkingSpace = async (req, res = response) => {
    try {
        const { idParkingSpace } = req.params;

        const parkinSpace = await ParkingSpacesModel.findOne({ where: { idParkingSpace: idParkingSpace } });

        if (!parkinSpace) {
            return res.status(404).json({ error: 'Id parking space not found.' });
        }

        res.json({
            parkinSpace,
        });
    } catch (error) {
        console.error('Error to get parking space.', error);
        res.status(500).json({
            error: 'Error to get parking space.',
        });
    }
};

const getAllParkingSpace = async (req, res = response) => {
    try {
        const parkingSpaces = await ParkingSpacesModel.findAll();
        const parkingSpacesList = await Promise.all(parkingSpaces.map(async (parking) => {

            const vehiclesInParking = await GuestIncomeParking.findOne({
                where: { idParkingSpace: parking.idParkingSpace },
            });

            let guestIncomeInfo = null;

            if (vehiclesInParking) {
                guestIncomeInfo = await Guest_income.findOne({
                    where: { idGuest_income: vehiclesInParking.idGuest_income },
                });
            }

            const apartmentWithParking = await AssignedParking.findOne({
                where: { idParkingSpace: parking.idParkingSpace },
            });

            let apartmentInfo = null;
            if (apartmentWithParking) {
                apartmentInfo = await ApartmentModel.findOne({
                    where: { idApartment: apartmentWithParking.idApartment }
                });
            }

            parking.dataValues.apartmentAssigned = {
                apartmentWithParking,
                apartmentInfo,
            };

            parking.dataValues.vehicleAssigned = guestIncomeInfo;

            return parking;
        }));

        res.json({
            parkingSpaces: parkingSpacesList
        });

    } catch (error) {
        console.error('Error get parking spaces', error);
        res.status(500).json({
            error: 'Error get parking spaces 500',
        });
    }
}




const postParkingSpace = async (req, res) => {




    try {

        let newParkingscreated = 0;

        const { floor, parkingPerFloor, status, ...parkingAtributes } = req.body;

        for (let parking = 1; parking <= parkingPerFloor; parking++) {

            await ParkingSpacesModel.create({
                parkingName: (parking < 10) ? `${floor}0${parking}` : `${floor}${parking}`,
                status: "Active",
                ...parkingAtributes

            });
            newParkingscreated++

        }
        message = `Se crearon ${newParkingscreated} parqueaderos nuevos.`;

        res.json({

            message: message,

        });



    } catch (e) {
        console.error('Error al crear la parqueadero:', e);
        const message = e.message || 'Error al crear parqueadero.';
        res.status(500).json({ message });
    }
};


const putParkingSpace = async (req, res = response) => {

    const body = req.body;
    let message = '';

    try {
        const { idParkingSpace, ...update } = body;

        //Can not update parkingName

        const [updatedRows] = await ParkingSpacesModel.update(update, {
            where: { idParkingSpace: idParkingSpace },
        });


        if (updatedRows > 0) {

            message = 'Parking spaces update ok';

        } else {

            message = 'Id parking space not found';

        }

        
    } catch (error) {

        message = 'Error update parking space' + error.message;

    }
    res.json({
        message: 'Se modifico el parqueadero.',
    });
};


// const deleteParkingSpace = async (req, res) => {

//     const { idParkingSpace } = req.body;

//     let message = '';

//     try {

//         const rowsDeleted = await ParkingSpacesModel.destroy({ where: { idParkingSpace: idParkingSpace } });

//         if (rowsDeleted > 0) {

//             message = 'Parking space delete ok.';

//         } else {

//             res.status(404).json({ error: 'Id parking space not found.' });

//         }

//     } catch (e) {

//         res.status(500).json({ error: 'Error delete parking space', message: e.message });

//     }
//     res.json({

//         parkingSpace: message,

//     });
// };


module.exports = {
    getOneParkingSpace,
    getAllParkingSpace,
    postParkingSpace,
    putParkingSpace,
    // deleteParkingSpace,
};
