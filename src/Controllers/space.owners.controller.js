const { response } = require('express');
const SpaceOwnerModel = require('../Models/space.owners.model');
const OwnersModel = require('../Models/owners.model');
const SpaceModel = require('../Models/spaces.model');

const getOneSpaceOwners = async (req, res = response) => {
    try {
        const { idSpace } = req.params;

        const spaces = await SpaceOwnerModel.findAll({
            where: { idSpace: idSpace },
        });
        const owners = await OwnersModel.findAll({
            attributes: ['idOwner', 'docNumber', 'name', 'lastName', 'email', 'phoneNumber'],
        });

        const data = spaces.map(so => {
            const owner = owners.find(ow => ow.idOwner === so.idOwner);

            return {
                ...so.dataValues,
                owner
            }
        });

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Id space not found.' });
        }

        res.json({
            spaces: data,
        });
    } catch (error) {
        console.error('Error to get space.', error);
        res.status(500).json({
            error: 'Error to get space.',
        });
    }
};


const getAllSpaceOwners = async (req, res) => {

    try {

        const spaceOwners = await SpaceOwnerModel.findAll();

        const spaces = await SpaceModel.findAll({
            attributes: ['idSpace', 'spaceType', 'spaceName', 'status']

        });

        const owners = await OwnersModel.findAll({
            attributes: ['idOwner', 'docNumber', 'name', 'lastName', 'email', 'phoneNumber'],

        });

        const data = spaceOwners.map(so => {

            const space = spaces.find(space => space.idSpace === so.idSpace);
            const owner = owners.find(ow => ow.idOwner === ow.idOwner);

            return {
                ...so.dataValues,
                space,
                owner
            }
        })

        res.json({

            spaceOwners: data

        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error getting space owners' });

    }

}


const postSpaceOwner = async (req, res) => {


    let message = '';
    const body = req.body;

    console.log(body)

    try {

        await SpaceOwnerModel.create(body);
        message = 'Space owner create';

    } catch (e) {

        message = e.message;

    }
    res.json({

        spaceOwners: message,

    });
};


const putSpaceOwner = async (req, res = response) => {

    const body = req.body;
    let message = '';

    try {

        const { idSpaceOwner, ...update } = body;

        const [updatedRows] = await SpaceOwnerModel.update(update, {

            where: { idSpaceOwner: idSpaceOwner },

        });

        if (updatedRows > 0) {

            message = 'Space owner assigned to space ok.';

        } else {

            message = 'Id space owner not found';

        }

    } catch (error) {

        message = 'Error update space owner' + error.message;

    }
    res.json({

        spaceOwners: message,

    });
};


const deleteSpaceOwner = async (req, res) => {

    const { idSpaceOwner } = req.body;
    let message = '';

    try {

        const rowsDeleted = await SpaceOwnerModel.destroy({ where: { idSpaceOwner: idSpaceOwner } });

        if (rowsDeleted > 0) {

            message = 'Space owner delete ok.';

        } else {

            res.status(404).json({ error: 'Id space owner not found.' });

        }

    } catch (e) {

        res.status(500).json({ error: 'Error delete space owner.', message: e.message });
    }

    res.json({

        spaceOwners: message,

    });
};


module.exports = {
    getAllSpaceOwners,
    getOneSpaceOwners,
    postSpaceOwner,
    putSpaceOwner,
    deleteSpaceOwner,
};
