const { response } = require('express');
const AssignedParkingModel = require('../Models/assigned.parking.model');
const ParkingSpaceModel = require('../Models/parking.spaces.model');
const SpaceModel = require('../Models/spaces.model');

const getSpacesWithAssignedParking = async (req, res = response) => {
    try {
        const { idSpace } = req.params;

        const spaces = await AssignedParkingModel.findAll({
            where: { idSpace: idSpace },
        });
        const parkingSpaces = await ParkingSpaceModel.findAll({
            attributes: ['idParkingSpace', 'parkingName', 'parkingType', 'status'],
        });

        const data = spaces.map(ap => {
            const parkingSpace = parkingSpaces.find(ps => ps.idParkingSpace === ap.idParkingSpace);

            return {
                ...ap.dataValues,
                parkingSpace
            }
        });

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Id space not found.' });
        }

        res.json({
            spaces: data,
        });
    } catch (error) {
        console.error('Error to get spaces.', error);
        res.status(500).json({
            error: 'Error to get spaces.',
        });
    }
};


const getAllAssignedParking = async (req, res) => {

    try {

        const assignedParkings = await AssignedParkingModel.findAll();

        const spaces = await SpaceModel.findAll({
            attributes: ['idSpace', 'spaceType', 'spaceName', 'status']
        });

        const parkingSpaces = await ParkingSpaceModel.findAll({
            attributes: ['idParkingSpace', 'parkingName', 'parkingType', 'status'],
        });

        const data = assignedParkings.map(ap => {

            const space = spaces.find(space => space.idSpace === ap.idSpace);
            const parkingSpace = parkingSpaces.find(ps => ps.idParkingSpace === ap.idParkingSpace);

            return {
                ...ap.dataValues,
                space,
                parkingSpace
            }
        })

        res.json({

            parkingSpaces: data

        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error getting assigned parkings' });

    }

}


const postAssignedParking = async (req, res) => {


    let message = '';
    const body = req.body;

    console.log(body)

    try {

        await AssignedParkingModel.create(body);
        message = 'Parking space create';

    } catch (e) {

        message = e.message;

    }
    res.json({

        assignedParkings: message,

    });
};


const putAssignedParking = async (req, res = response) => {

    const body = req.body;
    let message = '';

    try {

        const { idAssignedParking, ...update } = body;

        const [updatedRows] = await AssignedParkingModel.update(update, {

            where: { idAssignedParking: idAssignedParking },

        });

        if (updatedRows > 0) {

            message = 'Parking spaces assigned to space ok.';

        } else {

            message = 'Id Assigned parking not found';

        }

    } catch (error) {

        message = 'Error update assigned parking' + error.message;

    }
    res.json({

        assignedParkings: message,

    });
};


const deleteAssignedParking = async (req, res) => {

    const { idAssignedParking } = req.body;
    let message = '';

    try {

        const rowsDeleted = await AssignedParkingModel.destroy({ where: { idAssignedParking: idAssignedParking } });

        if (rowsDeleted > 0) {

            message = 'Assigned parking delete ok.';

        } else {

            res.status(404).json({ error: 'Id assigned parking not found.' });

        }

    } catch (e) {

        res.status(500).json({ error: 'Error delete assigned parking.', message: e.message });
    }

    res.json({

        assignedParkings: message,

    });
};


module.exports = {
    getSpacesWithAssignedParking,
    getAllAssignedParking,
    postAssignedParking,
    putAssignedParking,
    deleteAssignedParking,
};
