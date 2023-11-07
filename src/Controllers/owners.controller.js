const { response } = require('express');
const OwnersModel = require('../Models/owners.model');

const getOneOwner = async (req, res = response) => {
    try {
        const { idOwner } = req.params;

        const owner = await OwnersModel.findOne({ where: { idOwner: idOwner } });

        if (!owner) {
            return res.status(404).json({ error: 'Id owner not found.' });
        }

        res.json({
            owner,
        });
    } catch (error) {
        console.error('Error to get owner.', error);
        res.status(500).json({
            error: 'Error to get owner.',
        });
    }
};

const getAllOwners = async (req, res = response) => {
    try {

        const owners = await OwnersModel.findAll();

        console.log('Owner get ok', owners);

        res.json({

            owners,

        });

    } catch (error) {

        console.error('Error to get spaces', error);

        res.status(500).json({
            error: 'Error to get spaces 500',
        })
    };

}


const postOwner = async (req, res) => {


    let message = '';
    const body = req.body;

    console.log(body)

    try {

        await OwnersModel.create(body);
        message = 'Owner created';

    } catch (e) {

        message = e.message;

    }
    res.json({

        owners: message,

    });
};


const putOwner = async (req, res = response) => {

    const body = req.body;
    let message = '';

    try {
        const { idOwner, ...update } = body;

        const [updatedRows] = await OwnersModel.update(update, {
            where: { idOwner: idOwner },
        });

        if (updatedRows > 0) {

            message = 'Owner update ok';

        } else {

            message = 'Id owner is not found';

        }

    } catch (error) {

        message = 'Error update owner: ' + error.message;

    }
    res.json({

        owners: message,

    });
};



// const deleteOwner = async (req, res) => {

//     const { idOwner } = req.body;
//     let message = '';

//     try {

//         const rowsDeleted = await OwnersModel.destroy({ where: { idOwner: idOwner } });

//         if (rowsDeleted > 0) {

//             message = 'Owner dalete ok';

//         } else {

//             res.status(404).json({ error: 'Id owner not found' });

//         }
//     } catch (e) {

//         res.status(500).json({ error: 'Error delete owner', message: e.message });

//     }
//     res.json({

//         owners: message,

//     });
// };


module.exports = {
    getOneOwner,
    getAllOwners,
    postOwner,
    putOwner,
    // deleteOwner,
};
