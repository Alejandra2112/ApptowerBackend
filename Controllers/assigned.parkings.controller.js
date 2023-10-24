const { response } = require('express');
const AssignedParkingModel = require('../Models/assigned.parking.model');
const ParkingSpaceModel = require('../Models/parking.spaces.model');
const SpaceModel = require('../Models/spaces.model');


const getAssignedParking = async (req, res = response) => {
    try {
        const assignedParkings = await AssignedParkingModel.findAll({

            include: [

                {
                    model: SpaceModel,
                    attributes: ['idSpace', 'spaceType', 'spaceName', 'status']

                },

                {
                    model: ParkingSpaceModel,
                    attributes: ['idParkingSpace', 'parkingName', 'parkingType', 'status']
                }
            ]

        });

        console.log('Assigned parkings', assignedParkings);

        res.status(200).json({

            assignedParkings,

        });

    } catch (error) {

        console.error('Error to get assignamed parking', error);

        res.status(500).json({

            error: 'Error to get assignamed parking 500',

        })
    };

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
    getAssignedParking,
    postAssignedParking,
    putAssignedParking,
    deleteAssignedParking,
};
