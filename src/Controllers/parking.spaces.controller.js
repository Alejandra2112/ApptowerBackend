const { response } = require('express');
const ParkingSpacesModel = require('../Models/parking.spaces.model');

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

        console.log('Parking space get ok', parkingSpaces);

        res.json({

            parkingSpaces,

        });

    } catch (error) {

        console.error('Error get parking spaces', error);

        res.status(500).json({
            error: 'Error get parking spaces 500',
        })

    };

}


const postParkingSpace = async (req, res) => {


    let message = '';
    const body = req.body;

    console.log(body)
    
    try {

        await ParkingSpacesModel.create(body);
        message = 'Parking space create';

    } catch (e) {

        message = e.message;

    }
    res.json({

        parkingSpaces: message,
        
    });
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
        parkingSpaces: message,
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
