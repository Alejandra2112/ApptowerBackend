const { response } = require('express');
const ResidentModel = require('../Models/resident.model');

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


    let message = '';
    const body = req.body;

    console.log(body)

    try {

        await ResidentModel.create(body);
        message = 'resident created';

    } catch (e) {

        message = e.message;

    }
    res.json({

        residents: message,

    });
};


const putResident = async (req, res = response) => {

    const body = req.body;
    let message = '';

    try {
        const { idResident, ...update } = body;

        const [updatedRows] = await ResidentModel.update(update, {
            where: { idResident: idResident },
        });

        if (updatedRows > 0) {

            message = 'Resident update ok';

        } else {

            message = 'Id Resident is not found';

        }

    } catch (error) {

        message = 'Error update resident: ' + error.message;

    }
    res.json({

        residents: message,

    });
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
